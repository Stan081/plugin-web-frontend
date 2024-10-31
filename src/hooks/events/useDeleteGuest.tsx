import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "@/lib/token";
import { EVENT_GUEST } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";

export const useDeleteGuest = () => {
  const token = getToken();

  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ guestId }: { guestId: number }) => {
      const url = EVENT_GUEST + `/${guestId}`;
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
        title: "Your event guest has been deleted",
      });
      client.invalidateQueries({ queryKey: ["eventGuests"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete agenda",
        description: error?.message,
      });
    },
  });
};
