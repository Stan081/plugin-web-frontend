import { PUT_EVENT_ID } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { EventEntryFreeType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepSixResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EventEntryFree = async (
  data: EventEntryFreeType
): Promise<StepSixResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepSixResponse> = await axios.put(
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
