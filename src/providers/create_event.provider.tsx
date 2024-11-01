"use client";

import { useGetEventAgenda } from "@/hooks/events/useGetEventAgendas";
import { AgendaType } from "@/lib/types/EventType";
/* eslint-disable no-unused-vars */
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export type InviteeDataProps = {
  fullName: string;
  phoneNumber: string;
  passcode: string | null;
};

export type IsCheckedState = {
  addAgender: boolean;
  addMedia: boolean;
  addGests: boolean;
  addVendors: boolean;
  refundPolicy: boolean;
};

export type IsCheckedGroupState = {
  sectionDetail: boolean;
  labelling: boolean;
};

type CreateEventContextValue = {
  isChecked: IsCheckedState;
  isCheckedGroup: IsCheckedGroupState;
  isHost: boolean;
  seatType: string;
  selectTicket: string;
  allAgenda: any;
  inviteeState: InviteeDataProps[];
  handleCreateInvitee: (keys: InviteeDataProps) => void;
  handleClick: (key: string) => void;
  handleIsChecked: (key: keyof IsCheckedState) => void;
  handleIsCheckedGroup: (key: keyof IsCheckedGroupState) => void;
  setIsHost: (id: boolean) => void;
  setSelectedTicket: (key: string) => void;
};

const CreateEventDashContext = createContext<CreateEventContextValue | null>(
  null
);

CreateEventDashContext.displayName = "CreateEventDashContext";

export const seatedTypes: { id: string; name: string }[] = [
  {
    id: "paid",
    name: "Paid Ticket",
  },
  {
    id: "free",
    name: "Free Ticket",
  },
];

export const CreateEventProvider: FC<PropsWithChildren> = ({ children }) => {
  //state to get selected ticket
  const [selectTicket, setSelectedTicket] = useState<string>("");
  // state to check each accordion
  const [isChecked, setIsChecked] = useState({
    addAgender: false,
    addMedia: false,
    addGests: false,
    addVendors: false,
    refundPolicy: false,
  });

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


  // Function to handle creating a new vendor
  const handleCreateInvitee = (data: InviteeDataProps) => {
    const newInvitee = { ...data };
    setInviteeState((prevList) => [...prevList, newInvitee]);
  };

  const handleClick = (id: string) => {
    setSeatType(id);
  };

  // handle function to checked
  const handleIsChecked = (key: keyof typeof isChecked) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  // function to check Group ticket
  const handleIsCheckedGroup = (key: keyof typeof isCheckedGroup) => {
    setIsCheckedGroup((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const ContextValue: CreateEventContextValue = {
    isChecked,
    seatType,
    isCheckedGroup,
    isHost,
    selectTicket,
    inviteeState,
    allAgenda,
    handleCreateInvitee,
    setSelectedTicket,
    handleIsChecked,
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
