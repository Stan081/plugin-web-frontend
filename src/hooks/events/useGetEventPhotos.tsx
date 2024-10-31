import { EVENT_PHOTO } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEventPhotos = () => {
  const token = getToken();

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`, 
    },
  };

  return useQuery({
    queryKey: ["eventPhotos"],
    queryFn: () =>
      axios
        .get(EVENT_PHOTO, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true, 
    refetchOnWindowFocus: false,
    refetchOnMount: true, 
  });
};
