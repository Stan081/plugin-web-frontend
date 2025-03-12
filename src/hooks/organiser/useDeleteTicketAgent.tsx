import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "@/lib/token";
import { EVENT_TICKET_AGENT } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";

export const useDeleteTicketAgent = () => {
  const token = getToken();

  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ agentId }: { agentId: string }) => {
      const url = EVENT_TICKET_AGENT + `/${agentId}`;
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
        title: "Event has been deleted",
      });
      client.invalidateQueries({ queryKey: ["allTicketAgents"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete event",
        description: error?.message,
      });
    },
  });
};