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
  eventAgendas: AgendaType[];
};

/* ----------------------*/

export type VendorType = {
  thumbnail: string;
  isPass: string;
  vendorTag: string;
  passCategory: string[];
  price: number;
  slots: number;
};

export type EventVendorType = {
  eventVendors: VendorType[];
};

/* ----------------------*/

type EntryTicketType = {
  entryTicketType: string;
  ticketName: string;
  ticketPrice: number;
  ticketQuantity: number;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  ticketPeaks: string;
};

export type EventEntryPaidType = {
  ticketCategory: string;
  entryTicket: EntryTicketType;
};

/* ----------------------*/

type EntryFreeType = {
  entryTicketType: string;
  ticketName: string;
  ticketQuantity: number;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  ticketPeaks: string;
  reservation: string;
};

export type EventEntryFreeType = {
  ticketCategory: string;
  entryTicket: EntryFreeType;
};

/* ----------------------*/

type EntryDonationType = {
  entryTicketType: string;
  ticketName: string;
  ticketQuantity: number;
  minPrice: number;
  maxPrice: number;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  ticketPeaks: string;
  reservation: string;
};

export type EventEntryDonationType = {
  ticketCategory: string;
  entryTicket: EntryDonationType;
};

/* ----------------------*/

type GroupPaidType = {
  groupedTicketType: string;
  ticketName: string;
  ticketCategory: string;
  ticketQuantity: number;
  ticketPrice: number;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  ticketPeaks: string;
  seatMap: string;
  color: string;
};

export type EventGroupPaidType = {
  ticketCategory: string;
  groupedTicket: GroupPaidType;
};

/* ----------------------*/

type GroupFreeType = {
  groupedTicketType: string;
  ticketName: string;
  ticketCategory: string;
  ticketQuantity: number;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  ticketPeaks: string;
  seatMap: string;
  color: string;
};

export type EventGroupFreeType = {
  ticketCategory: string;
  groupedTicket: GroupFreeType;
};
