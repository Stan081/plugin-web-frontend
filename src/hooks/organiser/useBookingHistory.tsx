import { GET_EVENT_BOOKING_HISTORY } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEventBookingHistory = (eventId: string) => {
  const token  = getToken()
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["organiserBookingHistory", eventId],
    enabled: !!eventId,
    queryFn: () =>
      axios
        .get(GET_EVENT_BOOKING_HISTORY + `/${eventId}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true,
  });
};
