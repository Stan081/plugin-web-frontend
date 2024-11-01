import { EVENT_GROUP } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetGroupEvent = () => {
  const token = getToken();

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`, 
    },
  };

  return useQuery({
    queryKey: ["groupEvents"],
    queryFn: () =>
      axios
        .get(EVENT_GROUP, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true, 
    refetchOnWindowFocus: false,
    refetchOnMount: true, 
  });
};
