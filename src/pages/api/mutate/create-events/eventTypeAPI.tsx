import { PUT_EVENT_ID } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { OneTimeEventType, RecurringEventType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepThreeResponse = {
  status: number;
  message: string;
  data?: any;
};

export const OneTimeEvent = async (
  data: OneTimeEventType
): Promise<StepThreeResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepThreeResponse> = await axios.put(
        PUT_EVENT_ID(),
      data,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};


export const RecurringEvent = async (
  data: RecurringEventType
): Promise<StepThreeResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepThreeResponse> = await axios.put(
        PUT_EVENT_ID(),
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
