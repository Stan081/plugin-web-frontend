import { GET_ORGANISER_EVENTS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetOrganiserEvents = (id: string) => {
  const token  = getToken()
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["organiserEvents"],
    queryFn: () =>
      axios
        .get(GET_ORGANISER_EVENTS + `/${id}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: true,
  });
};
