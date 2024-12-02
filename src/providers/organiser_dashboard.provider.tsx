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
  campaignContent: boolean;
  StartCampaignState: boolean;
};

type OrganiserDashContextValue = {
  isChecked: IsCheckedState;
  showProfile: boolean
  currentStep: number;
  eventState: string;
  showPreviewEvent: boolean;
  showDeleteEvent: boolean;
  activeEvent: string;
  handleIsChecked: (key: keyof IsCheckedState) => void;
  nextSetUpStep: () => void;
  setEventState: (key: string) => void;
  handlePreviewEvent: () => void;
  handleShowDeleteEvent: () => void;
  setActiveEvent: (key: string) => void;
  handleCloseProfile: () => void
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

  // Organiser setting modal for profile
  const [showProfile, setShowProfile] = useState<boolean>(false);

  // switch organiser event tab
  const [eventState, setEventState] = useState<string>("upcoming");

  // show preview event state
  const [showPreviewEvent, setShowPreviewEvent] = useState<boolean>(false);

  // show preview event state
  const [showDeleteEvent, setShowDeleteEvent] = useState<boolean>(false);

  // state for event organiser dashboard
  const [activeEvent, setActiveEvent] = useState<string>("attendees");

  // Setup campaign state
  const [isChecked, setIsChecked] = useState({
    campaignTypeState: false,
    selectEventState: false,
    campaignContent: false,
    StartCampaignState: false,
  });

  // function to switch preview event
  const handlePreviewEvent = () => {
    setShowPreviewEvent(!showPreviewEvent);
  };

  // function to switch preview event
  const handleShowDeleteEvent = () => {
    setShowDeleteEvent(!showDeleteEvent);
  };

  // function to increment setup step
  const nextSetUpStep: () => void = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // handle function to checked
  const handleIsChecked = (key: keyof typeof isChecked) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [key]: true,
    }));
  };

  // handle close organiser profile modal

  const handleCloseProfile = () => {
    setShowProfile(!showProfile)
  }

  const ContextValue: OrganiserDashContextValue = {
    currentStep,
    showProfile,
    isChecked,
    eventState,
    showPreviewEvent,
    showDeleteEvent,
    activeEvent,
    setActiveEvent,
    handlePreviewEvent,
    handleIsChecked,
    nextSetUpStep,
    setEventState,
    handleCloseProfile,
    handleShowDeleteEvent,
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
