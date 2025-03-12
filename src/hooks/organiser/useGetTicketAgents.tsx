import { EVENT_TICKET_AGENT } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetTicketAgents = (eventId: string) => {
  const options = {
    headers: {
      Accept: "application/json",
    },
  };

  return useQuery({
    queryKey: ["allTicketAgents"],
    queryFn: () =>
      axios
        .get(EVENT_TICKET_AGENT + `/${eventId}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true,
  });
};