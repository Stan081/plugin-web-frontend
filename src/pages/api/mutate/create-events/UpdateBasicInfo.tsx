import { EVENT_BASIC_INFO_URL, PUT_EVENT_ID } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { EventBasicInfoType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepOneResponse = {
  status: number;
  message: string;
  data?: any;
};

export const UpdateBasicInfo = async (
  data: EventBasicInfoType
): Promise<StepOneResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepOneResponse> = await axios.put(
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
