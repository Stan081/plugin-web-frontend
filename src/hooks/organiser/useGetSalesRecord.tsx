import { SALES_RECORD } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetSalesRecord = (eventId: string) => {
  const token = getToken();
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["eventSalesRecord", eventId],
    enabled: !!eventId,
    queryFn: () =>
      axios
        .get(SALES_RECORD + `/${eventId}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true,
  });
};
