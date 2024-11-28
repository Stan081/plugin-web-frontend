import { FOLLOW_ORGANISER } from "@/lib/constants";
import { getToken } from "@/lib/token";
import axios, { AxiosResponse } from "axios";

type FollowResponse = {
  status: number;
  message: string;
  data?: any;
};

export const FollowOrganiser = async (data: {
    organizerId: string;
}): Promise<FollowResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<FollowResponse> = await axios.post(
      FOLLOW_ORGANISER,
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
