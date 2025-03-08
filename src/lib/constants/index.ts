import { getCookie } from "../cookies";
import dotenv from "dotenv";

export const WEB_URL: string = "https://test.pluginent.com";

dotenv.config();

export const BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL;

export const API_URL: string = `${BASE_URL}/api`;

export const SIGNUP_URL: string = `${API_URL}/auth/sign-up-one`;

export const VERIFY_URL: string = `${API_URL}/auth/sign-up-two`;

export const LOGIN_URL: string = `${API_URL}/auth/login-step-one`;

export const VERIFY_LOGIN_URL: string = `${API_URL}/auth/login-step-two`;

export const GET_USER_URL: string = `${API_URL}/auth/me`;

export const EVENT_BASIC_INFO_URL: string = `${API_URL}/event`;

export const ORGANISER_PROFILE: string = `${API_URL}/organizers`;

export const GET_ALL_EVENTS: string = `${API_URL}/event/events`;

export const EVENT_FAVOURITE: string = `${API_URL}/favourites`;

export const GET_ORGANISER: string = `${API_URL}/organizers/organizer`;

export const GET_ORGANISER_EVENTS: string = `${API_URL}/organizers/events`;

export const ALL_ORGANISERS: string = `${API_URL}/organizers`;

export const FILTER_EVENTS: string = `${API_URL}/event/filter`;

export const TICKETS: string = `${API_URL}/tickets`;

export const CAMPAIGN: string = `${API_URL}/campaign`;

export const FOLLOW_ORGANISER: string = `${API_URL}/follow`;

export const FETCH_ALL_BANK_ACCOUNTS: string = `${API_URL}/account/banks`;

export const GET_BANK_ACCOUNTS: string = `${API_URL}/account/account/bank-details`;

export const VERIFY_BANK_ACCOUNTS: string = `${API_URL}/account/validate-bank-account`;

export const ADD_BANK_ACCOUNTS: string = `${API_URL}/account/add`;

export const WITHDRAWAL: string = `${API_URL}/withdrawal`;

export const WITHDRAWAL_VERIFY: string = `${API_URL}/withdrawal/verify`;

export const WITHDRAWALSTATS: string = `${API_URL}/withdrawal/statistics`;

export const WITHDRAWAL_HISTORY: string = `${API_URL}/withdrawal/history`;

export const ATTENDEE_LIST: string = `${API_URL}/organizers/events/attendees`;

export const SALES_RECORD: string = `${API_URL}/organizers/events/sales-records`;

export const GET_EVENT_BY_ID: string = `${API_URL}/event/events`;

export const GET_SUCCESSFUL_TICKETS: string = `${API_URL}/tickets/booking`;

export const GET_EVENT_SUMMARY: string = `${API_URL}/organizers/event/summary`;

export const GET_EVENT_BOOKING_HISTORY: string = `${API_URL}/organizers/bookings`;

export const GET_USER_FOLLOWERS: string = `${API_URL}/users/following/organizers`;

export const GET_EVENT_TICKETS: string = `${API_URL}/organizers/event/tickets`;

// export const GET_EVENT_BY_ID = (): string => {
//   const eventId = getCookie("event_id");
//   return `${API_URL}/event/events/${eventId}`;
// };

export const PUT_EVENT_ID = (): string => {
  const eventId = getCookie("event_id");
  return `${API_URL}/event/${eventId}`;
};

export const EDIT_PROFILE_ROLE = (): string => {
  const user_id = getCookie("user_id");
  return `${API_URL}/users/${user_id}`;
};

export const EVENT_AGENDA = (): string => {
  const eventId = getCookie("event_id");
  return `${API_URL}/event/${eventId}/agendas`;
};

export const EVENT_VENDOR = (): string => {
  const eventId = getCookie("event_id");
  return `${API_URL}/event/${eventId}/vendors`;
};

export const EVENT_GUEST = (): string => {
  const eventId = getCookie("event_id");
  return `${API_URL}/event/${eventId}/guests`;
};

export const EVENT_PHOTO = (): string => {
  const eventId = getCookie("event_id");
  return `${API_URL}/event/${eventId}/photos`;
};

export const DELETE_EVENT_PHOTO = (): string => {
  const eventId = getCookie("event_id");
  return `${API_URL}/event/${eventId}/photo`;
};

export const EVENT_GROUP = (): string => {
  const eventId = getCookie("event_id");
  return `${API_URL}/event/${eventId}/groupedTickets`;
};

export const GET_ORG_PROFILE = (): string => {
  const userId = getCookie("user_id");
  return `${API_URL}/organizers/organizer/${userId}`;
};

export const UPDATE_ORG_PROFILE = (): string => {
  const userId = getCookie("user_id");
  return `${API_URL}/organizers/${userId}`;
};

export const GET_FOLLOW_ID = (): string => {
  const userId = getCookie("user_id");
  return `${API_URL}/follow/${userId}`;
};

export const REMOVE_FOLLOW = (): string => {
  const userId = getCookie("user_id");
  return `${API_URL}/follow/${userId}`;
};

export const CHECK_BANK_STATUS = (): string => {
  const userId = getCookie("user_id");
  return `${API_URL}/account/${userId}`;
};

export const EDIT_BANK_ACCOUNT = (): string => {
  const userId = getCookie("user_id");
  return `${API_URL}/account/edit/${userId}`;
};
