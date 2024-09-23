"use client";

/* eslint-disable no-unused-vars */
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

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
  selectTicket: string;
  handleIsChecked: (key: keyof IsCheckedState) => void;
  handleIsCheckedGroup: (key: keyof IsCheckedGroupState) => void;
  setIsHost: (id: boolean) => void;
  setSelectedTicket: (key: string) => void
};

const CreateEventDashContext = createContext<CreateEventContextValue | null>(
  null
);

CreateEventDashContext.displayName = "CreateEventDashContext";

export const CreateEventProvider: FC<PropsWithChildren> = ({ children }) => {
  //state to get selected ticket
  const [selectTicket, setSelectedTicket] = useState<string>("group-ticket");
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
    isCheckedGroup,
    isHost,
    selectTicket,
    setSelectedTicket,
    handleIsChecked,
    handleIsCheckedGroup,
    setIsHost,
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
