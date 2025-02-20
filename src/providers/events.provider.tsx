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
import Cookies from "js-cookie";

type TicketProps = {
  name: string;
  quantity: number;
  price: number;
};

type EntryData = {
  name: string;
  price: number;
  quantity: number;
};

type EventsContextValue = {
  counter: number;
  entryData: EntryData;
  freeEventPayload: any;
  tickets: TicketProps[];
  publishedEventId: string;
  setCounter: (key: any) => void;
  setFreeEventPayload: (key: any) => void;
  setTickets: (key: any) => void;
  setEntryData: (key: EntryData) => void;
  setPublishedEventId: (key:string) => void;
};

const EventsDashContext = createContext<EventsContextValue | null>(null);

EventsDashContext.displayName = "EventsDashContext";

const getCookie = (key: string) => {
  const cookie = Cookies.get(key);
  try {
    return cookie ? JSON.parse(decodeURIComponent(cookie)) : null;
  } catch (error) {
    console.error("Error parsing cookie:", error);
    return null;
  }
};

export const EventsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [counter, setCounter] = useState<number>(0);

  // state to hold event Id
  const [publishedEventId, setPublishedEventId] = useState<string | null>();

  // State to hold payload for free events
  const [freeEventPayload, setFreeEventPayload] = useState<any | null>();

  const [tickets, setTickets] = useState(() => {
    const savedTickets = getCookie("tickets");
    return Array.isArray(savedTickets) ? savedTickets : [];
  });

  const [entryData, setEntryData] = useState<EntryData>();

  const ContextValue: EventsContextValue = {
    counter,
    tickets,
    entryData,
    publishedEventId,
    freeEventPayload,
    setFreeEventPayload,
    setCounter,
    setTickets,
    setEntryData,
    setPublishedEventId,
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
