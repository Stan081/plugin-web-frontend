import { EVENT_GROUP } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { GroupPaidType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepSixResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EventGroupFree = async (
  data: GroupPaidType
): Promise<StepSixResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepSixResponse> = await axios.post(
      EVENT_GROUP(),
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
