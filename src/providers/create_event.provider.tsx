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

type CreateEventContextValue = {
  isChecked: IsCheckedState;
  isHost: boolean;
  handleIsChecked: (key: keyof IsCheckedState) => void;
  setIsHost: (id:boolean) => void;
};

const CreateEventDashContext = createContext<CreateEventContextValue | null>(
  null
);

CreateEventDashContext.displayName = "CreateEventDashContext";

export const CreateEventProvider: FC<PropsWithChildren> = ({ children }) => {
  // state to check each accordion
  const [isChecked, setIsChecked] = useState({
    addAgender: false,
    addMedia: false,
    addGests: false,
    addVendors: false,
    refundPolicy: false,
  });

  // state for checking Agenda host
  const [isHost, setIsHost] = useState<boolean>(false);

  //
  const handleIsChecked = (key: keyof typeof isChecked) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const ContextValue: CreateEventContextValue = {
    isChecked,
    isHost,
    handleIsChecked,
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
