import { EVENT_BASIC_INFO_URL } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { EventMediaGallery } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepFivResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EventMedia = async (
  data: EventMediaGallery
): Promise<StepFivResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepFivResponse> = await axios.post(
      EVENT_BASIC_INFO_URL,
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
