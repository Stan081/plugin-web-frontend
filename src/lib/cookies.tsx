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
