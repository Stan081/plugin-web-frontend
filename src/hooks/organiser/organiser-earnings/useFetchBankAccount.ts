import { FETCH_ALL_BANK_ACCOUNTS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchAllBankAccounts = () => {
  const token = getToken()
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["fetchBankAccount"],
    queryFn: () =>
      axios
        .get(FETCH_ALL_BANK_ACCOUNTS, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err.message; 
        }),
    retry: false,
  });
};
