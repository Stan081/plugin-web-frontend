import { VERIFY_BANK_ACCOUNTS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { OrganiserProfileType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type VerifyAccountResponse = {
  status: number;
  message: string;
  data?: any;
};

export const VerifyAccount = async (
  data: OrganiserProfileType
): Promise<VerifyAccountResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<VerifyAccountResponse> = await axios.post(
        VERIFY_BANK_ACCOUNTS,
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
