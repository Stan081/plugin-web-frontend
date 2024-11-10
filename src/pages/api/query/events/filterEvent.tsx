import { FILTER_EVENTS } from "@/lib/constants";
import axios from "axios";

export const fetchFilteredEvents = async ({ queryKey }: any) => {
  const [_key, { minPrice, maxPrice, locationType, eventType }] = queryKey;
  try {
    const response = await axios.get(FILTER_EVENTS, {
      params: {
        minPrice,
        maxPrice,
        locationType,
        eventType,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      console.log("there is an error");
    } else {
      return response?.data;
    }
  } catch (error) {
    throw new Error(error?.message);
  }
};
