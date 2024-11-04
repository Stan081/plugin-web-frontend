import { PUT_EVENT_ID } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { EventTicketsType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepSixResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EventTicketType = async (
  data: EventTicketsType
): Promise<StepSixResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepSixResponse> = await axios.put(
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
