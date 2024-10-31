import { getCookie } from "../cookies";

const user_id = getCookie("user_id");

const event_id = getCookie("event_id");

const BASE_URL: string = "https://pluginapi.onrender.com";

export const API_URL: string = `${BASE_URL}/api`;

export const SIGNUP_URL: string = `${API_URL}/auth/sign-up-one`;

export const VERIFY_URL: string = `${API_URL}/auth/sign-up-two`;

export const LOGIN_URL: string = `${API_URL}/auth/login-step-one`;

export const VERIFY_LOGIN_URL: string = `${API_URL}/auth/login-step-two`;

export const GET_USER_URL: string = `${API_URL}/auth/me`;

export const EVENT_BASIC_INFO_URL: string = `${API_URL}/event`;

export const PUT_EVENT_ID: string = `${API_URL}/event/${event_id}`;

export const EDIT_PROFILE_ROLE: string = `${API_URL}/users/${user_id}`;

export const EVENT_AGENDA: string = `${API_URL}/event/${event_id}/agendas`;

export const EVENT_VENDOR: string = `${API_URL}/event/${event_id}/vendors`;

export const EVENT_GUEST: string = `${API_URL}/event/${event_id}/guests`;

export const EVENT_PHOTO: string = `${API_URL}/event/${event_id}/photos`;

export const DELETE_EVENT_PHOTO: string = `${API_URL}/event/${event_id}/photo`;


