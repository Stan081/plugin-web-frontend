import { REMOVE_FOLLOW } from "@/lib/constants";
import { getToken } from "@/lib/token";
import axios, { AxiosResponse } from "axios";

type FollowResponse = {
  status: number;
  message: string;
  data?: any;
};

export const removeFellowOrg = async (data: {
  organizerId: string;
}): Promise<FollowResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<FollowResponse> = await axios.delete(
        REMOVE_FOLLOW(),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
