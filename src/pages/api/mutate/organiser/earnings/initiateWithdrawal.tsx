import { WITHDRAWAL } from "@/lib/constants";
import { getToken } from "@/lib/token";
import axios, { AxiosResponse } from "axios";

type WithdrawalResponse = {
  status: number;
  message: string;
  data?: any;
};

export const InitiateWithdrawal = async (
  data: number
): Promise<WithdrawalResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<WithdrawalResponse> = await axios.post(
      WITHDRAWAL,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
