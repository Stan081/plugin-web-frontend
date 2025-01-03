import { GET_BANK_ACCOUNTS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetBankAccount = () => {
  const token = getToken()
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["GetBankAccount"],
    queryFn: () =>
      axios
        .get(GET_BANK_ACCOUNTS, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err.message; 
        }),
    retry: true,
  });
};
