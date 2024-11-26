import { GET_ALL_EVENTS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllEvents = () => {

  const options = {
    headers: {
      Accept: "application/json",
    },
  };

  return useQuery({
    queryKey: ["allEvents"],
    queryFn: () =>
      axios
        .get(GET_ALL_EVENTS, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: false,
    refetchOnMount: true, 
  });
};
