import { ALL_ORGANISERS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEventsByOrganiser = () => {
  const token = getToken();
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["organiserEvents"],
    queryFn: () =>
      axios
        .get(ALL_ORGANISERS + '/all/events', options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true,
  });
};
