import { EVENT_GUEST } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { GuestType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type StepFiveResponse = {
  status: number;
  message: string;
  data?: any;
};

export const EditEventGuest = async (
  data: GuestType,
  guestID: number
): Promise<StepFiveResponse> => {
  const token = getToken();
  const id: string = String(guestID);
  try {
    const response: AxiosResponse<StepFiveResponse> = await axios.patch(
      EVENT_GUEST() + `/${id}`,
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
