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
    queryKey: ["isBookmark", id],
    queryFn: () =>
      axios
        .get(EVENT_FAVOURITE + `/${id}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    // Skip when we don't have an event id yet or the user is not logged in;
    // calling without these just produces a guaranteed-failed request.
    enabled: !!id && !!token,
    retry: false,
  });
};
