import { ATTENDEE_LIST } from "@/lib/constants";
import { getToken } from "@/lib/token";
import axios from "axios";

export const fetchFilteredAttendeeList = async ( eventId) => {
//   const { minPrice, maxPrice, locationType, eventType, startDate, endDate, eventName } =
//     queryKey;
const token = getToken();

  try {
    const response = await axios.get(ATTENDEE_LIST + `/${eventId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    //   params: {
    //     minPrice,
    //     maxPrice,
    //     locationType,
    //     eventType,
    //     startDate,
    //     endDate,
    //     eventName,
    //   },
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