import { EVENT_FAVOURITE} from "@/lib/constants";
import { getToken } from "@/lib/token";
import axios, { AxiosResponse } from "axios";

type FavouriteType = {
  status: number;
  message: string;
  data?: any;
};

export const AddFavourite = async (data: {
  eventId: string;
}): Promise<FavouriteType> => {
  const token = getToken();
  try {
    const response: AxiosResponse<FavouriteType> = await axios.post(
      EVENT_FAVOURITE,
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
