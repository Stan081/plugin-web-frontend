import { EVENT_GUEST } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { GuestType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepFiveResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EventGuestList = async (
  data: GuestType
): Promise<StepFiveResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepFiveResponse> = await axios.post(
      EVENT_GUEST,
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
