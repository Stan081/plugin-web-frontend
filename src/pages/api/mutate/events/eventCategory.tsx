import { PUT_EVENT_ID } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { EventCategoryType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepTwoResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EventCategoryAPI = async (
  data: EventCategoryType
): Promise<StepTwoResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepTwoResponse> = await axios.post(
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
