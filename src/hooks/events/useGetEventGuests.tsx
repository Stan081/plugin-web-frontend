import { EVENT_GUEST } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEventGuests = () => {
  const token = getToken();

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`, 
    },
  };

  return useQuery({
    queryKey: ["eventGuests"],
    queryFn: () =>
      axios
        .get(EVENT_GUEST, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true, 
    refetchOnWindowFocus: false,
    refetchOnMount: true, 
  });
};
