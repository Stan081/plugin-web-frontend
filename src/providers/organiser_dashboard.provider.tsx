"use client";
import { EmailCampaignForm, SponsorListingForm } from "@/models/campaign";
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
  chooseAudience: boolean;
  campaignContent: boolean;
  durationBudget: boolean;
  adContent: boolean;
  StartCampaignState: boolean;
};

type OrganiserDashContextValue = {
  isChecked: IsCheckedState;
  checkedEvent: string | null;
  showProfile: boolean;
  currentStep: number;
  eventState: string;
  showDeleteEvent: boolean;
  activeEvent: string;
  clickedCampaignId: number;
  emailCampaignData: EmailCampaignForm;
  sponsorCampaignData: SponsorListingForm;
  MediaCampaignData: any;
  handleIsChecked: (key: keyof IsCheckedState) => void;
  nextSetUpStep: () => void;
  previousSetUpStep: () => void;
  setEventState: (key: string) => void;
  handleShowDeleteEvent: () => void;
  setActiveEvent: (key: string) => void;
  handleCloseProfile: () => void;
  setClickedCampaignId: (num: number) => void;
  setCurrentStep: (num: number) => void;
  setCheckedEvent: (key: string) => void;
  setEmailCampaignData: (key: EmailCampaignForm) => void;
  setSponsorCampaignData: (key: SponsorListingForm) => void;
  setMediaCampaignData: (key: any) => void
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

  //state to get eventId
  const [checkedEvent, setCheckedEvent] = useState<string | null>(null);

  // Organiser setting modal for profile
  const [showProfile, setShowProfile] = useState<boolean>(false);

  // switch organiser event tab
  const [eventState, setEventState] = useState<string>("upcoming");

  // show preview event state
  const [showDeleteEvent, setShowDeleteEvent] = useState<boolean>(false);

  // state for event organiser dashboard
  const [activeEvent, setActiveEvent] = useState<string>("attendees");

  // state to store clicked campaign
  const [clickedCampaignId, setClickedCampaignId] = useState<number>(null);

  // Setup campaign state
  const [isChecked, setIsChecked] = useState({
    campaignTypeState: false,
    selectEventState: false,
    chooseAudience: false,
    durationBudget: false,
    campaignContent: false,
    adContent: false,
    StartCampaignState: false,
  });

  // state to store email data
  const [emailCampaignData, setEmailCampaignData] =
    useState<EmailCampaignForm>(null);

  // state to store sponsorListing data
  const [sponsorCampaignData, setSponsorCampaignData] =
    useState<SponsorListingForm>(null);

  // state to store ads content data
  const [MediaCampaignData, setMediaCampaignData] = useState<any>({
    audienceData: null,
    budgetData: null,
    adContent: null,
  });


  // function to switch preview event
  const handleShowDeleteEvent = () => {
    setShowDeleteEvent(!showDeleteEvent);
  };

  // function to increment setup step
  const nextSetUpStep: () => void = () => {
    setCurrentStep((prev) => prev + 1);
  };

  // function to increment setup step
  const previousSetUpStep: () => void = () => {
    setCurrentStep((prev) => {
      if (prev < 1) {
        return prev;
      }
      return prev - 1;
    });
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
    showDeleteEvent,
    activeEvent,
    emailCampaignData,
    sponsorCampaignData,
    MediaCampaignData,
    setMediaCampaignData,
    setEmailCampaignData,
    setSponsorCampaignData,
    setCurrentStep,
    setClickedCampaignId,
    setActiveEvent,
    handleIsChecked,
    nextSetUpStep,
    previousSetUpStep,
    setEventState,
    handleCloseProfile,
    handleShowDeleteEvent,
    setCheckedEvent,
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
