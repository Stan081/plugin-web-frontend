import Cookies from "js-cookie";

export const getCookie = (key: string) => {
  const getKey = Cookies.get(key);
  return getKey;
};

export const setCookie = (key: string, value: any) => {
  try {
    Cookies.set(key, value);
  } catch (error) {
    console.error("Error setting value:", error);
  }
};

export const removeCookie = (key: string) => {
  try {
    Cookies.remove(key);
  } catch (error) {
    console.error("Error removing cookie:", error);
  }
};
