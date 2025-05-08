"use client";

import { useGetEventAgenda } from "@/hooks/events/useGetEventAgendas";
import { getCookie, removeCookie, setCookie } from "@/lib/cookies";
import { useMe } from "@/pages/api/query/me";
import { useRouter } from "next/navigation";
/* eslint-disable no-unused-vars */
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type InviteeDataProps = {
  fullName: string;
  phoneNumber: string;
  passcode: string | null;
};

export type IsCheckedGroupState = {
  sectionDetail: boolean;
  labelling: boolean;
};

type CreateEventContextValue = {
  currentStep: number;
  showProfileForm: boolean;
  isCheckedGroup: IsCheckedGroupState;
  isHost: boolean;
  seatType: string;
  selectTicket: string;
  allAgenda: any;
  inviteeState: InviteeDataProps[];
  nextStep: () => void;
  previousStep: () => void;
  setShowProfileForm: (key: boolean) => void;
  clearStep: () => void;
  saveToDraft: () => void;
  handleCreateInvitee: (keys: InviteeDataProps) => void;
  handleClick: (key: string) => void;
  handleIsCheckedGroup: (key: keyof IsCheckedGroupState) => void;
  setIsHost: (id: boolean) => void;
  setSelectedTicket: (key: string) => void;
  setCurrentStep: (key: number) => void;
};

const CreateEventDashContext = createContext<CreateEventContextValue | null>(
  null
);

CreateEventDashContext.displayName = "CreateEventDashContext";


export const CreateEventProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: userData } = useMe();
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const savedStep = getCookie("currentStep");
    return savedStep ? Number(savedStep) : 1;
  });



  const [showProfileForm, setShowProfileForm] = useState<boolean>(false);

  //state to get selected ticket
  const [selectTicket, setSelectedTicket] = useState<string>("");

  // state to check each accordion for group ticket
  const [isCheckedGroup, setIsCheckedGroup] = useState({
    sectionDetail: false,
    labelling: false,
  });

  // state for checking Agenda host
  const [isHost, setIsHost] = useState<boolean>(false);

  // state for group seat type
  const [seatType, setSeatType] = useState<string>("paid");

  // invitee data connect
  const [inviteeState, setInviteeState] = useState<InviteeDataProps[]>([]);

  const { data: allAgenda } = useGetEventAgenda();

  useEffect(() => {
    setCookie("currentStep", currentStep.toString());
  }, [currentStep]);

  const router = useRouter();

  // Function to handle creating a new vendor
  const handleCreateInvitee = (data: InviteeDataProps) => {
    const newInvitee = { ...data };
    setInviteeState((prevList) => [...prevList, newInvitee]);
  };

  const handleClick = (id: string) => {
    setSeatType(id);
  };

  // function to check Group ticket
  const handleIsCheckedGroup = (key: keyof typeof isCheckedGroup) => {
    setIsCheckedGroup((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const clearStep = () => {
    setTimeout(() => {
      removeCookie("currentStep");
      removeCookie("event_id");
    }, 10000);
  };

  const saveToDraft = () => {
    if (!userData?.data?.isOrganizer) {
      return setShowProfileForm(!showProfileForm);
    }

    router.push("/organiser");
    if (getCookie("event_id")) {
      removeCookie("event_id");
    }
    // setTimeout(() => {
    //   setCurrentStep(1);
    // }, 2000);
  };


  const ContextValue: CreateEventContextValue = {
    currentStep,
    seatType,
    isCheckedGroup,
    isHost,
    selectTicket,
    inviteeState,
    allAgenda,
    showProfileForm,
    setCurrentStep,
    saveToDraft,
    setShowProfileForm,
    nextStep,
    previousStep,
    clearStep,
    handleCreateInvitee,
    setSelectedTicket,
    handleIsCheckedGroup,
    setIsHost,
    handleClick,
  };
  return (
    <CreateEventDashContext.Provider value={ContextValue}>
      {children}
    </CreateEventDashContext.Provider>
  );
};

export const useCreateEventContext = () => {
  const context = useContext(CreateEventDashContext);

  if (!context) {
    throw new Error(
      "useCreateEventContext must be used within an CreateEventProvider"
    );
  }

  return context;
};
