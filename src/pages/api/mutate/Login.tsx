import { LoginFieldType } from "@/lib/types/AuthType";
import { AxiosResponse } from "axios";

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  data?: any;
}

export const signUpStepOne = async (
  data: LoginFieldType
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      SIGNUP_URL,
      data
    );

    // Return the response data if successful
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};
