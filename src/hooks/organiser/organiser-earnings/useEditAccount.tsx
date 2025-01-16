import { EDIT_BANK_ACCOUNT } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { OrganiserProfileType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type EditAccountResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EditBankAccount = async (
  data: OrganiserProfileType
): Promise<EditAccountResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<EditAccountResponse> = await axios.put(
        EDIT_BANK_ACCOUNT(),
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