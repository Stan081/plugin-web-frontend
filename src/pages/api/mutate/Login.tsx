import { LOGIN_URL, VERIFY_LOGIN_URL } from "@/lib/constants";
import { LoginFieldType, VerifyCodeType } from "@/lib/types/AuthType";
import axios, { AxiosResponse } from "axios";

type LoginResponse = {
  success: boolean;
  message: string;
  token: string;
  data?: any;
}

type VerifyLoginResponse = {
  success: boolean;
  message: string;
  token: string;
  data?: any;
}

export const login = async (data: LoginFieldType): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      LOGIN_URL,
      data
    );

    // Return the response data if successful
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const VerifyLoginCode = async (
  data: VerifyCodeType
): Promise<VerifyLoginResponse> => {
  try {
    const response: AxiosResponse<VerifyLoginResponse> = await axios.post(
      VERIFY_LOGIN_URL,
      data
    );

    // Return the response data if successful
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};
