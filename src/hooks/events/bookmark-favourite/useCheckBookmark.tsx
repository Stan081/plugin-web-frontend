import { EVENT_FAVOURITE } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCheckBookmark = (id: string) => {
  const token = getToken()

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["isBookmark"],
    queryFn: () =>
      axios
        .get(EVENT_FAVOURITE + `/${id}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: false, 
  });
};
