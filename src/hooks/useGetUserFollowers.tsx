import { GET_USER_FOLLOWERS } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUserFollowers = () => {
    const token = getToken();
  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["user_followers"],
    queryFn: () =>
      axios
        .get(GET_USER_FOLLOWERS, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message;
        }),
    retry: true,
  });
};
