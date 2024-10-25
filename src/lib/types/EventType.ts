import { string } from "yup";

export type EventBasicInfoType = {
  eventBanner: string;
  thumbnail: string;
  eventName: string;
  eventDescription: string;
};

/* ----------------------*/

export type EventCategoryType = {
  eventCategory: string[];
};

/* ----------------------*/

type OneTimeType = {
  startDate: Date;
  startTime: string;
  timeZone: string;
  endTime: string;
  endDate: Date;
};

export type OneTimeEventType = {
  eventType: string;
  oneTimeEvent: OneTimeType;
};

/* ----------------------*/

type RecurringType = {
  scheduleReference: string;
  startDate: Date;
  startTime: string;
  timeZone: string;
  endTime: string;
  endDate: Date;
};

export type RecurringEventType = {
  eventType: string;
  recurringEvent: RecurringType;
};

/* ----------------------*/

type LocationAddressType = {
  address: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
};

export type physicalLocationType = {
  locationType: string;
  physicalLocation: LocationAddressType;
};

/* ----------------------*/

type OnlineAddress = {
  onlineVenue: string;
  venueLink: string;
};

export type OnlineAddressType = {
  locationType: string;
  onlineLocation: OnlineAddress;
};

/* ----------------------*/

export type EventMediaGallery = {
  eventPhotos: string[];
};

/* ----------------------*/

export type RefundPolicyType = {
  refundPolicyAgreed: boolean;
};

/* ----------------------*/

type GuestType = {
  name: string;
  photo: string;
  role: string;
};

export type EventGuestListType = {
  guestList: GuestType[];
};

/* ----------------------*/

type AgendaType = {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  host?: {
    name: string;
    photo: string;
  };
};

export type EventAgendaType = {
  eventAgendas: AgendaType[]
};
