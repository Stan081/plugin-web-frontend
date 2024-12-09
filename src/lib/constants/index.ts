import { getCookie } from "../cookies";

export const BASE_URL: string = "http://localhost:8000";

// export const BASE_URL: string = "https://pluginapi.onrender.com";

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

export const FOLLOW_ORGANISER: string = `${API_URL}/follow`;

export const GET_EVENT_BY_ID = (): string => {
  const eventId = getCookie("event_id");
  return `${API_URL}/event/events/${eventId}`;
};

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
