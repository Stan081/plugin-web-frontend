import { GET_ORGANISER_EVENT_BY_ID } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetOrganiserEventById = (eventId: string) => {
  const token = getToken();
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["organiserEventById", eventId],
    enabled: !!eventId,
    queryFn: () =>
      axios
        .get(GET_ORGANISER_EVENT_BY_ID + `/${eventId}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true,
  });
};
