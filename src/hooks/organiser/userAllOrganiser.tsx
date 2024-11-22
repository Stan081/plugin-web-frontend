import { ALL_ORGANISERS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAllOrganisers = () => {
  const options = {
    headers: {
      Accept: "application/json",
    },
  };

  return useQuery({
    queryKey: ["organisers"],
    queryFn: () =>
      axios
        .get(ALL_ORGANISERS, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message;
        }),
    retry: false,
  });
};
