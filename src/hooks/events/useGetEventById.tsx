import { GET_EVENT_BY_ID } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEventById = () => {

  const options = {
    headers: {
      Accept: "application/json",
    },
  };

  return useQuery({
    queryKey: ["eventID"],
    queryFn: () =>
      axios
        .get(GET_EVENT_BY_ID(), options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true, 
  });
};
