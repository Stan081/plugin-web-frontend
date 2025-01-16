import { WITHDRAWALSTATS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetWithdrawalStats = () => {
  const token = getToken();
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["GetWithdrawalStats"],
    queryFn: () =>
      axios
        .get(WITHDRAWALSTATS, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err.message;
        }),
    retry: true,
  });
};
