import { DELETE_EVENT_PHOTO } from "@/lib/constants";
import { getToken } from "@/lib/token";
import axios, { AxiosResponse } from "axios";

type StepFiveResponse = {
  status: number;
  message: string;
  data?: any;
};

export const DeleteEventPhoto = async (data: {
  photoUrl: string;
}): Promise<StepFiveResponse> => {
  const token = getToken();

  try {
    const response: AxiosResponse<StepFiveResponse> = await axios.delete(
      DELETE_EVENT_PHOTO,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Error deleting photo");
  }
};
