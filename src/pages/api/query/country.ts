import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // Import axios if not using a custom axios instance

export const useGetCountry = () => {
  return useQuery({
    queryKey: ["country"],
    queryFn: () =>
      axios
        .get("https://ipapi.co/json/")
        .then((res) => res.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Better error handling
        }),
    retry: true,
    refetchOnMount: true,
  });
};
