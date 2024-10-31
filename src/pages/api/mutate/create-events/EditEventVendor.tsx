import { EVENT_VENDOR } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { VendorType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepFiveResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EditEventVendor = async (
  data: VendorType,
  vendorID: number
): Promise<StepFiveResponse> => {
  const token = getToken();
  const id: string = String(vendorID);
  try {
    const response: AxiosResponse<StepFiveResponse> = await axios.patch(
      EVENT_VENDOR + `/${id}`,
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
