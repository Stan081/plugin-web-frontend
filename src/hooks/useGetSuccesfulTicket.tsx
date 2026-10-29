import { GET_SUCCESSFUL_TICKETS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Tickets for the payment-success page. The API only returns them with the
// link token Paystack redirects back with (`t`), or to the signed-in buyer.
export const useGetSuccessfulTicket = (
  bookingId?: string | null,
  accessToken?: string | null
) => {
  const token = getToken();
  const options = {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    params: accessToken ? { t: accessToken } : undefined,
  };

  return useQuery({
    queryKey: ["ticketPayload", bookingId, accessToken],
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
