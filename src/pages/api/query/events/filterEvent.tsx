import { FILTER_EVENTS } from "@/lib/constants";
import axios from "axios";

export const fetchFilteredEvents = async (queryKey: any) => {
  const { minPrice, maxPrice, locationType, eventType, startDate, endDate } =
    queryKey;
  try {
    const response = await axios.get(FILTER_EVENTS, {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        minPrice,
        maxPrice,
        locationType,
        eventType,
        startDate,
        endDate,
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
