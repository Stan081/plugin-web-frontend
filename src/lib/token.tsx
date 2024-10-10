import Cookies from "js-cookie";

export const getToken = () => {
  const token = Cookies.get("signature");
  return token;
};

export const setToken = (token: string) => {
  try {
    Cookies.set("signature", token);
  } catch (error) {
    console.error("Error setting token:", error);
  }
};