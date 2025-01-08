import { WITHDRAWAL_HISTORY } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetWithdrawalHistory = (queryKey: any) => {
  const { pageNum } = queryKey;
  const token = getToken();
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: pageNum,
    },
  };

  return useQuery({
    queryKey: ["GetWithdrawalHistory"],
    queryFn: () =>
      axios
        .get(WITHDRAWAL_HISTORY, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err.message;
        }),
    retry: true,
  });
};
