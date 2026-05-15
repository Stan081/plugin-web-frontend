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
    // Don't fire the request until we actually have an id (e.g. while
    // useParams() is still resolving on first render). This avoids a
    // wasted GET .../events/undefined request and a subsequent re-fetch.
    enabled: !!eventId,
    // Cache the event for a few minutes so navigating between the details
    // page and the checkout page does not re-fetch the same event.
    staleTime: 5 * 60_000,
    retry: false,
  });
};
