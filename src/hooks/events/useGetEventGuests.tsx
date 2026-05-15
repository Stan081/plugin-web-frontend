import { EVENT_GUEST } from "@/lib/constants";
import { getCookie } from "@/lib/cookies";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEventGuests = () => {
  const token = getToken();
  const eventId = getCookie("event_id");

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`, 
    },
  };

  return useQuery({
    queryKey: ["eventGuests", eventId],
    queryFn: () => {
      // Validate event ID exists before making API call
      if (!eventId || eventId === "undefined") {
        console.warn("[useGetEventGuests] Event ID is undefined or invalid");
        return Promise.resolve({ data: [] });
      }

      return axios
        .get(EVENT_GUEST(), options)
        .then((res) => res?.data)
        .catch((err) => {
          console.error("[useGetEventGuests] API Error:", err?.response?.data || err.message);
          throw err?.response?.data || err.message;
        });
    },
    enabled: !!eventId && eventId !== "undefined",
    retry: true, 
    refetchOnWindowFocus: false,
    refetchOnMount: true, 
  });
};
