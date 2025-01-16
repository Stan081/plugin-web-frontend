import { TICKETS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // Import axios if not using a custom axios instance

// Get all purchased events by a user
export const useGetTicketEvents = () => {
  const token = getToken();

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["getTicketEvents"],
    queryFn: () =>
      axios
        .get(TICKETS + `/user/events`, options)
        .then((res) => res.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Better error handling
        }),
    retry: true,
    refetchOnMount: true,
  });
};

// Get all purchased tickets by a uer, ties to same eventId and date/time
export const useGetEventTickets = (id: string, createdAt: string) => {
  const token = getToken();

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["getTickets"],
    queryFn: () =>
      axios
        .get(TICKETS + `/user/events/${id}/created/${createdAt}`, options)
        .then((res) => res.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Better error handling
        }),
    retry: true,
    refetchOnMount: true,
  });
};
