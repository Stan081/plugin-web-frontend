import { EVENT_VENDOR } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { VendorType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepFiveResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EventVendor = async (
  data: VendorType
): Promise<StepFiveResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<StepFiveResponse> = await axios.post(
      EVENT_VENDOR,
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
