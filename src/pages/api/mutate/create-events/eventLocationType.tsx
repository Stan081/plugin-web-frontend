import { PUT_EVENT_ID } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { physicalLocationType, OnlineAddressType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepFourResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EventPhysicalLocation = async (
  data: physicalLocationType
): Promise<StepFourResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepFourResponse> = await axios.put(
        PUT_EVENT_ID,
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


export const EventOnlineLocation = async (
  data: OnlineAddressType
): Promise<StepFourResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepFourResponse> = await axios.put(
        PUT_EVENT_ID,
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