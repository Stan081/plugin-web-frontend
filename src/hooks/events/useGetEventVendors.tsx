import { EVENT_VENDOR } from "@/lib/constants";
import { getCookie } from "@/lib/cookies";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEventVendors = () => {
  const token = getToken();
  const eventId = getCookie("event_id");

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`, 
    },
  };

  return useQuery({
    queryKey: ["eventVendors", eventId],
    queryFn: () => {
      // Validate event ID exists before making API call
      if (!eventId || eventId === "undefined") {
        console.warn("[useGetEventVendors] Event ID is undefined or invalid");
        return Promise.resolve({ data: [] });
      }

      return axios
        .get(EVENT_VENDOR(), options)
        .then((res) => res?.data)
        .catch((err) => {
          console.error("[useGetEventVendors] API Error:", err?.response?.data || err.message);
          throw err?.response?.data || err.message;
        });
    },
    enabled: !!eventId && eventId !== "undefined",
    retry: true, 
    refetchOnWindowFocus: false,
    refetchOnMount: true, 
  });
};
