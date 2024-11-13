import { EVENT_FAVOURITE } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAllBookmark = () => {

  const token = getToken()

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`, 
    },
  };

  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: () =>
      axios
        .get(EVENT_FAVOURITE, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true, 
  });
};
