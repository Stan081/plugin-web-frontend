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
  checkedEvent: string | null
  showProfile: boolean;
  currentStep: number;
  eventState: string;
  showPreviewEvent: boolean;
  showDeleteEvent: boolean;
  activeEvent: string;
  clickedCampaignId: number;
  handleIsChecked: (key: keyof IsCheckedState) => void;
  nextSetUpStep: () => void;
  setEventState: (key: string) => void;
  handlePreviewEvent: () => void;
  handleShowDeleteEvent: () => void;
  setActiveEvent: (key: string) => void;
  handleCloseProfile: () => void;
  setClickedCampaignId: (num: number) => void;
  setCurrentStep: (num: number) => void;
  setCheckedEvent: (key: string) => void;
};

const OrganiserDashContext = createContext<OrganiserDashContextValue | null>(
  null
);

OrganiserDashContext.displayName = "OrganiserDashContext";

export const OrganiserDashboardProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  //step for each campaign setup
  const [currentStep, setCurrentStep] = useState<number>(3);

  //state to get eventId 
  const [checkedEvent, setCheckedEvent] = useState<string | null>(null);

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

  // state to store clicked campaign
  const [clickedCampaignId, setClickedCampaignId] = useState<number>(3);

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
    setShowProfile(!showProfile);
  };

  const ContextValue: OrganiserDashContextValue = {
    currentStep,
    clickedCampaignId,
    showProfile,
    checkedEvent,
    isChecked,
    eventState,
    showPreviewEvent,
    showDeleteEvent,
    activeEvent,
    setCurrentStep,
    setClickedCampaignId,
    setActiveEvent,
    handlePreviewEvent,
    handleIsChecked,
    nextSetUpStep,
    setEventState,
    handleCloseProfile,
    handleShowDeleteEvent,
    setCheckedEvent
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
