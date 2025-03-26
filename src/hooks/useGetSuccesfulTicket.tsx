import { GET_SUCCESSFUL_TICKETS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetSuccessfulTicket = (bookingId: string) => {
  const options = {
    headers: {
      Accept: "application/json",
    },
  };

  return useQuery({
    queryKey: ["ticketPayload"],
    queryFn: () =>
      axios
        .get(GET_SUCCESSFUL_TICKETS + `/${bookingId}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message;
        }),
    retry: true,
  });
};
