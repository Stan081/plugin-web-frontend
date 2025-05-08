import { TICKETS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // Import axios if not using a custom axios instance

// export type FilterTicketParams = {
//   page?: number;
//   id: string
// };
// Get all purchased events by a user
export const useGetTicketEvents = (page: number) => {
  const token = getToken();

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      page
    },
  };

  return useQuery({
    queryKey: ["getTicketEvents", page],
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

// Get all purchased tickets by a user, ties to same eventId
export const useGetEventTickets = (id: string, page: number,) => {
  const token = getToken();

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      page
    },
  };

  return useQuery({
    queryKey: ["getTickets", page],
    queryFn: () =>
      axios
        .get(TICKETS + `/user/events/${id}`, options)
        .then((res) => res.data)
        .catch((err) => {
          throw err?.response?.data || err.message;
        }),
    retry: true,
    refetchOnMount: true,
  });
};
