"use client";
import React from "react";

/* eslint-disable no-unused-vars */
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type IsCheckedState = {
  campaignTypeState: boolean;
  selectEventState: boolean;
  campaignPlanState: boolean;
  StartCampaignState: boolean;
};

type OrganiserDashContextValue = {
  isChecked: IsCheckedState;
  currentStep: number
  handleIsChecked: (key: keyof IsCheckedState) => void;
  nextSetUpStep: () => void;

};

const OrganiserDashContext = createContext<OrganiserDashContextValue | null>(
  null
);

OrganiserDashContext.displayName = "OrganiserDashContext";

export const OrganiserDashboardProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  //step for each campaign setup
  const [currentStep, setCurrentStep] = useState<number>(1);

  const nextSetUpStep: () => void = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // Setup campaign state
  const [isChecked, setIsChecked] = useState({
    campaignTypeState: false,
    selectEventState: false,
    campaignPlanState: false,
    StartCampaignState: false,
  });

  // handle function to checked
  const handleIsChecked = (key: keyof typeof isChecked) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [key]: true,
    }));
  };

  const ContextValue: OrganiserDashContextValue = {
    currentStep,
    isChecked,
    handleIsChecked,
    nextSetUpStep,
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
