import { GET_ORGANISER } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useOrganiser = (id: string) => {
  const options = {
    headers: {
      Accept: "application/json",
    },
  };

  return useQuery({
    queryKey: ["organiser"],
    queryFn: () =>
      axios
        .get(GET_ORGANISER + `/${id}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message;
        }),
    retry: false,
  });
};
