"use client";
import { deleteToken } from "@/lib/token";
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
  setUser: (key: SignupFieldType) => void;
  logout: () => void
};

const UserDashContext = createContext<UserDashContextValue | null>(null);

UserDashContext.displayName = "UserDashContext";

export const UserDashboardProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: userData, isError, isLoading } = useMe();
  const [user, setUser] = useState<SignupFieldType>();

  const router = useRouter()

  useEffect(() => {
    if (userData) {
      setUser(userData?.data); 
    }
  }, [userData]); 

  const logout = () => {
    deleteToken(); 
    setUser(undefined); 
    router.push("/login"); 
  };

  const ContextValue: UserDashContextValue = {
    user,
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
