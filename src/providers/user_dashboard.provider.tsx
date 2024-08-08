"use client";

/* eslint-disable no-unused-vars */
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type UserDashContextValue = {
  user: boolean;
};

const UserDashContext = createContext<UserDashContextValue | null>(null);

UserDashContext.displayName = "UserDashContext";

export const UserDashboardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<boolean>(false);

  const ContextValue: UserDashContextValue = {
    user,
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
