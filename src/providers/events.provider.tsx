"use client";

/* eslint-disable no-unused-vars */
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

type EventsContextValue = {

};

const EventsDashContext = createContext<EventsContextValue | null>(null);

EventsDashContext.displayName = "EventsDashContext";

export const EventsProvider: FC<PropsWithChildren> = ({ children }) => {
  

  const ContextValue: EventsContextValue = {

  };
  return (
    <EventsDashContext.Provider value={ContextValue}>
      {children}
    </EventsDashContext.Provider>
  );
};

export const useEventsContext = () => {
  const context = useContext(EventsDashContext);

  if (!context) {
    throw new Error("useEventsContext must be used within an EventsProvider");
  }

  return context;
};
