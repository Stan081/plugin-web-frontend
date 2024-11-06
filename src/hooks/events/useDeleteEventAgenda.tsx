import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "@/lib/token";
import { EVENT_AGENDA } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";

export const useDeleteAgenda = () => {
  const token = getToken();

  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ agendaId }: { agendaId: number }) => {
      const url = EVENT_AGENDA() + `/${agendaId}`;
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
        title: "Your event agenda has been deleted",
      });
      client.invalidateQueries({ queryKey: ["eventAgendas"] });
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
