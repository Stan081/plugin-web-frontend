import { PUT_EVENT_ID } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEvent = () => {
  const token = getToken();

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`, 
    },
  };

  return useQuery({
    queryKey: ["eventById"],
    queryFn: () =>
      axios
        .get(PUT_EVENT_ID(), options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true,
    refetchOnMount: true,
  });
};
