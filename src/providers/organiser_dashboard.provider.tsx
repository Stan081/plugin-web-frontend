"use client";
import React from 'react'

/* eslint-disable no-unused-vars */
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type OrganiserDashContextValue = {
  organiser: string;
  setOrganiser: (key: string) => void;
};

const OrganiserDashContext = createContext<OrganiserDashContextValue | null>(null);

OrganiserDashContext.displayName = "OrganiserDashContext";

export const OrganiserDashboardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [organiser, setOrganiser] = useState<string>('');
  

  const ContextValue: OrganiserDashContextValue = {
    organiser,
    setOrganiser
  };
  return (
    <OrganiserDashContext.Provider value={ContextValue}>
      {children}
    </OrganiserDashContext.Provider>
  );
};

export const useOrganiserDashContext = () => {
  const context = useContext(OrganiserDashContext);

  if (!context) {
    throw new Error(
      "useOrganiserDashContext must be used within an OrganiserDashboardProvider"
    );
  }

  return context;
};
