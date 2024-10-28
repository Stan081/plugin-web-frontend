import { PUT_EVENT_ID } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { EventGroupFreeType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepsixResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EventGroupFree = async (
  data: EventGroupFreeType
): Promise<StepsixResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepsixResponse> = await axios.put(
      PUT_EVENT_ID,
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
