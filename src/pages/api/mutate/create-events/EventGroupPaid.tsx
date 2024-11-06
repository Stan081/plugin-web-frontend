import { EVENT_GROUP } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { GroupPaidType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepsixResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EventGroupPaid = async (
  data: GroupPaidType
): Promise<StepsixResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepsixResponse> = await axios.post(
      EVENT_GROUP(),
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
