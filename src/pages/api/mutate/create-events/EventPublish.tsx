import { PUT_EVENT_ID } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { EventPublishType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepSevenResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EventPublish = async (
  data: EventPublishType
): Promise<StepSevenResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepSevenResponse> = await axios.put(
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
