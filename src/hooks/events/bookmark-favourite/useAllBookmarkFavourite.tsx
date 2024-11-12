import { EVENT_FAVOURITE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAllBookmark = () => {

  const options = {
    headers: {
      Accept: "application/json",
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
    retry: false, 
  });
};
