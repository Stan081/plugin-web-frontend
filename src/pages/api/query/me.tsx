import { GET_USER_URL } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // Import axios if not using a custom axios instance

export const useMe = () => {
  const token = getToken();

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`, 
    },
  };

  return useQuery({
    queryKey: ["me"],
    queryFn: () =>
      axios
        .get(GET_USER_URL, options)
        .then((res) => res.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Better error handling
        }),

    refetchOnWindowFocus: false,
    refetchOnMount: true, 
  });
};
