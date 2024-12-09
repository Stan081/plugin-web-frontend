import { CAMPAIGN } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { EventBasicInfoType } from "@/lib/types/EventType";
import axios, { AxiosResponse } from "axios";

type CampaignResponse = {
  status: number;
  message: string;
  data?: any;
};

export const CreateCampaign = async (
  data: any
): Promise<CampaignResponse> => {
  const token = getToken()
  try {
    const response: AxiosResponse<CampaignResponse> = await axios.post(
      CAMPAIGN,
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
