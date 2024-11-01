import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "@/lib/token";
import { EVENT_GROUP } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";

export const useDeleteEventGroup = () => {
  const token = getToken();

  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ groupTicketId }: { groupTicketId: number }) => {
      const url = EVENT_GROUP + `/${groupTicketId}`;
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
        title: "Your group event ticket has been deleted",
      });
      client.invalidateQueries({ queryKey: ["groupEvents"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete vendor",
        description: error?.message,
      });
    },
  });
};
