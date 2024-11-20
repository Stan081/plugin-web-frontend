import { ORGANISER_PROFILE } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { OrganiserProfileType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type OrganiserProfileResponse = {
  status: number;
  message: string;
  data?: any;
};

export const CreateOrganiserProfile = async (
  data: OrganiserProfileType
): Promise<OrganiserProfileResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<OrganiserProfileResponse> = await axios.post(
        ORGANISER_PROFILE,
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
