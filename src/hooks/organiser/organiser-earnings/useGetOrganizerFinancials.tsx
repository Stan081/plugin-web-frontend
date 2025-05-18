import { ORGANIZER_EARNINGS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetOrganizerFinancials = () => {
  const token = getToken();
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["GetOrgnaizerFinsancials"],
    queryFn: () =>
      axios
        .get(ORGANIZER_EARNINGS, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err.message;
        }),
    retry: true,
  });
};
