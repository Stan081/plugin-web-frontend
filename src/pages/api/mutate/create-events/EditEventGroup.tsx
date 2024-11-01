import { EVENT_GROUP } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { GroupPaidType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepSixResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EditEventGroup = async (
  data: GroupPaidType,
  GroupTicketID: number
): Promise<StepSixResponse> => {
  const token = getToken();
  const id: string = String(GroupTicketID);
  try {
    const response: AxiosResponse<StepSixResponse> = await axios.patch(
      EVENT_GROUP + `/${id}`,
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
