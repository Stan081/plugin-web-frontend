import { EVENT_TICKET_AGENT } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { OrganiserProfileType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type TicketAgentResponse = {
  status: number;
  message: string;
  data?: any;
};

export const CreateTicketAgent = async (
  data: OrganiserProfileType
): Promise<TicketAgentResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<TicketAgentResponse> = await axios.post(
        EVENT_TICKET_AGENT,
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