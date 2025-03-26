import { EVENT_AGENDA } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { AgendaType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepFiveResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EditEventAgenda = async (
  data: AgendaType,
  agendaID: number
): Promise<StepFiveResponse> => {
  const token = getToken();
  const id: string = String(agendaID);
  try {
    const response: AxiosResponse<StepFiveResponse> = await axios.patch(
      EVENT_AGENDA() + `/${id}`,
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
