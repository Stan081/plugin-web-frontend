import { GET_EVENT_BY_ID } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEventById = (eventId: string | undefined) => {
  const options = {
    headers: {
      Accept: "application/json",
    },
    timeout: 5000,
  };

  return useQuery({
    queryKey: ["eventID", eventId],
    queryFn: () =>
      axios
        .get(`${GET_EVENT_BY_ID}/${eventId}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          console.error("Error fetching event data:", err);
          throw err?.response?.data || err.message;
        }),
    retry: false,
  });
};
