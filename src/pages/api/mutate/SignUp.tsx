import { SignupFieldType, VerifyCodeType } from "@/lib/types/AuthType";
import { SIGNUP_URL, VERIFY_URL } from "@/lib/constants";
import axios, { AxiosResponse } from "axios";
import { SignupFields } from "@/models/auth";

type SignUpResponse = {
  success: boolean;
  message: string;
  data?: any;
}

type VerifyResponse =  {
  success: boolean;
  message: string;
  token: string;
  data?: any;
}

export const signUpStepOne = async (
  data: SignupFieldType
): Promise<SignUpResponse> => {
  try {
    const response: AxiosResponse<SignUpResponse> = await axios.post(
      SIGNUP_URL,
      data
    );

    // Return the response data if successful
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const VerifyCode = async (
  data: VerifyCodeType
): Promise<VerifyResponse> => {
  try {
    const response: AxiosResponse<VerifyResponse> = await axios.post(
      VERIFY_URL,
      data
    );

    // Return the response data if successful
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};
