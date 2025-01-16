import { CHECK_BANK_STATUS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCheckAddedAccount = () => {
  const token = getToken()
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["CheckAccountStatus"],
    queryFn: () =>
      axios
        .get(CHECK_BANK_STATUS(), options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err.message; 
        }),
    retry: true,
  });
};
