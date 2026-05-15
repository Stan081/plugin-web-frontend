import { EVENT_AGENDA } from "@/lib/constants";
import { getCookie } from "@/lib/cookies";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEventAgenda = () => {
  const token = getToken();
  const eventId = getCookie("event_id");

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["eventAgendas", eventId],
    queryFn: () => {
      // Validate event ID exists before making API call
      if (!eventId || eventId === "undefined") {
        console.warn("[useGetEventAgenda] Event ID is undefined or invalid");
        return Promise.resolve({ data: [] }); // Return empty data instead of failing
      }

      return axios
        .get(EVENT_AGENDA(), options)
        .then((res) => res?.data)
        .catch((err) => {
          console.error("[useGetEventAgenda] API Error:", err?.response?.data || err.message);
          throw err?.response?.data || err.message;
        });
    },
    enabled: !!eventId && eventId !== "undefined", // Only run query if valid event ID exists
    retry: false,
    refetchInterval: false,
    // refetchOnReconnect: false

  });
};
