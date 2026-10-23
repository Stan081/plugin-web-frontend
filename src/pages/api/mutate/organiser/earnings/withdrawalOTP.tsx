import { WITHDRAWAL_VERIFY } from "@/lib/constants";
import { getToken } from "@/lib/token";
import axios, { AxiosResponse } from "axios";

type WithdrawalResponse = {
  status: number;
  message: string;
  data?: any;
};

export const WithdrawalOTP = async (data: {
  otp: string;
}): Promise<WithdrawalResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<WithdrawalResponse> = await axios.post(
      WITHDRAWAL_VERIFY,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    // The server counts down remaining attempts and locks out on the fifth. Those
    // messages are the only signal the organiser gets, so never swallow them —
    // falling through to `undefined` here would show an empty error toast.
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "We couldn't verify that code. Please try again."
    );
  }
};
