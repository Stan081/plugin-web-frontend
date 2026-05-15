import { GET_SUCCESSFUL_TICKETS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetSuccessfulTicket = (bookingId?: string | null) => {
  const options = {
    headers: {
      Accept: "application/json",
    },
  };

  return useQuery({
    queryKey: ["ticketPayload", bookingId],
    queryFn: () =>
      axios
        .get(GET_SUCCESSFUL_TICKETS + `/${bookingId}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message;
        }),
    enabled: !!bookingId && bookingId !== "null",
    retry: false,
  });
};
