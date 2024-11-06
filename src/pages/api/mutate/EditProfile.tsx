import { EDIT_PROFILE_ROLE } from "@/lib/constants";
import { getToken } from "@/lib/token";
import axios, { AxiosResponse } from "axios";

type EditProfileResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EditProfileRole = async (
  data: {role: string}
): Promise<EditProfileResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<EditProfileResponse> = await axios.patch(
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
