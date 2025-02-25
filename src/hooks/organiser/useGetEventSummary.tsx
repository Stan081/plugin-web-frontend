import { GET_EVENT_SUMMARY } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEventSummary = (eventId: string) => {
  const token  = getToken()
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["organiserEventSummary"],
    queryFn: () =>
      axios
        .get(GET_EVENT_SUMMARY + `/${eventId}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true,
  });
};
