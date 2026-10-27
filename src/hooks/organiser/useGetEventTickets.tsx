import { GET_EVENT_TICKETS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetOrganiserEventTickets = (eventId: string) => {
  const token = getToken();
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["eventTickets", eventId],
    enabled: !!eventId,
    queryFn: () =>
      axios
        .get(GET_EVENT_TICKETS + `/${eventId}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; 
        }),
    retry: true,
  });
};
