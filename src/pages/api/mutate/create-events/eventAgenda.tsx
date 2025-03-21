import { EVENT_AGENDA } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { AgendaType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepFiveResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EventAgenda = async (
  data: AgendaType
): Promise<StepFiveResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepFiveResponse> = await axios.post(
      EVENT_AGENDA(),
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
