"use client";
import { setCookie } from "@/lib/cookies";
import { deleteToken, getToken } from "@/lib/token";
import { useMe } from "@/pages/api/query/me";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

/* eslint-disable no-unused-vars */
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type UserDashContextValue = {
  shouldRedirect: boolean;
  logout: () => void;
  setShouldRedirect: (key: boolean) => void;
};

const UserDashContext = createContext<UserDashContextValue | null>(null);

UserDashContext.displayName = "UserDashContext";

export const UserDashboardProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: userData } = useMe();
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const router = useRouter();

  const token = getToken();

  useEffect(() => {
    if (shouldRedirect) {
      if (token) {
        router.push("/");
      } else {
        router.push("/login");
      }
    }
  }, [shouldRedirect, token, router]);

  useEffect(() => {
    if (userData?.data) {
      setCookie("user_id", userData?.data?._id);
    }
  }, [userData]);

  const logout = () => {
    deleteToken();
    setShouldRedirect(false);
    router.replace("/login");
  };

  const ContextValue: UserDashContextValue = {
    shouldRedirect,
    setShouldRedirect,
    logout,
  };

  return (
    <UserDashContext.Provider value={ContextValue}>
      {children}
    </UserDashContext.Provider>
  );
};

export const useUserDashContext = () => {
  const context = useContext(UserDashContext);

  if (!context) {
    throw new Error(
      "useUserDashContext must be used within an UserDashboardProvider"
    );
  }

  return context;
};
