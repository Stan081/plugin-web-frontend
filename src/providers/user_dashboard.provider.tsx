"use client";
import { SignupFieldType } from "@/lib/types/AuthType";
import React from "react";

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
  setUser: (key: SignupFieldType) => void
};

const UserDashContext = createContext<UserDashContextValue | null>(null);

UserDashContext.displayName = "UserDashContext";

export const UserDashboardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<SignupFieldType>();

  console.log(user)

  const ContextValue: UserDashContextValue = {
    user,
    setUser,
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
