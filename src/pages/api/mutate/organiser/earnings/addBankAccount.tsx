import { ADD_BANK_ACCOUNTS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { OrganiserProfileType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type AddAccountResponse = {
  status: number;
  message: string;
  data?: any;
};

export const AddBankAccount = async (
  data: OrganiserProfileType
): Promise<AddAccountResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<AddAccountResponse> = await axios.post(
        ADD_BANK_ACCOUNTS,
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
