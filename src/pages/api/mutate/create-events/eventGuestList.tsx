import { PUT_EVENT_ID } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { EventGuestListType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepFivResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EventGuestList = async (
  data: EventGuestListType
): Promise<StepFivResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepFivResponse> = await axios.put(
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
