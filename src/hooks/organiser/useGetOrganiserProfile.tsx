import { GET_ORG_PROFILE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetOrgProfileById = () => {

  const options = {
    headers: {
      Accept: "application/json",
    },
  };

  return useQuery({
    queryKey: ["organiserProfile"],
    queryFn: () =>
      axios
        .get(GET_ORG_PROFILE(), options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true, 
  });
};
