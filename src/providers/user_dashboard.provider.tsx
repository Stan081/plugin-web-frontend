"use client";
import { deleteToken, getToken } from "@/lib/token";
import { SignupFieldType } from "@/lib/types/AuthType";
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
  user: SignupFieldType;
  shouldRedirect: boolean;
  setUser: (key: SignupFieldType) => void;
  logout: () => void;
  setShouldRedirect: (key: boolean) => void;
};

const UserDashContext = createContext<UserDashContextValue | null>(null);

UserDashContext.displayName = "UserDashContext";

export const UserDashboardProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: userData,  } = useMe();
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const [user, setUser] = useState<SignupFieldType>();
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
    if (userData) {
      setUser(userData?.data);
    }
  }, [userData]);

  const logout = () => {
    deleteToken();
    setUser(undefined);
    setShouldRedirect(false);
    router.push("/login");
  };

  const ContextValue: UserDashContextValue = {
    user,
    shouldRedirect,
    setShouldRedirect,
    setUser,
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
