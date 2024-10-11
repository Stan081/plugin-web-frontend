import Cookies from "js-cookie";

export const getCookie = (key: string) => {
  const token = Cookies.get(key);
  return token;
};

export const setCookie = (key: string, token: any) => {
  try {
    Cookies.set(key, token);
  } catch (error) {
    console.error("Error setting token:", error);
  }
};
