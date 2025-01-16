import { FOLLOW_ORGANISER } from "@/lib/constants";
import { getToken } from "@/lib/token";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

type FollowResponse = {
  status: number;
  message: string;
  data?: unknown;
};

export const FollowOrganiser = async (data: {
  organizerId: string;
}): Promise<FollowResponse> => {
  const token = getToken();
  try {
    const response: AxiosResponse<FollowResponse> = await axios.post(
      FOLLOW_ORGANISER,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

//check if user is following organiser
export const useCheckFollow = (id: string) => {
  const token = getToken();

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return useQuery({
    queryKey: ["isFollowing", id],
    queryFn: () =>
      axios
        .get(FOLLOW_ORGANISER + `/is-following/${id}`, options)
        .then((res) => res?.data)
        .catch((err) => {
          throw err?.response?.data || err.message; // Improved error handling
        }),
    retry: false,
  });
};

export const useUnfollow = (id: string) => {
  const token = getToken();

  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: () => {
      const url = FOLLOW_ORGANISER + `/${id}`;
      return axios.delete(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "You've successfully unfollowed organiser",
      });
      client.invalidateQueries({ queryKey: ["isFollowing"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to unfollow organiser",
        description: error?.message,
      });
    },
  });
};
