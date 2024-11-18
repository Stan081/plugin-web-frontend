import { EDIT_PROFILE_ROLE } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { EditUserType } from "@/lib/types/AuthType";
import axios, { AxiosResponse } from "axios";

type EditUserAccountResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EditUser = async (
  data: EditUserType
): Promise<EditUserAccountResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<EditUserAccountResponse> = await axios.patch(
      EDIT_PROFILE_ROLE(),
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
