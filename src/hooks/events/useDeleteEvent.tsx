import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "@/lib/token";
import { EVENT_BASIC_INFO_URL } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const useDeleteEvent = (close: () => void) => {
  const token = getToken();
  const router = useRouter()

  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId }: { eventId: string }) => {
      const url = EVENT_BASIC_INFO_URL + `/${eventId}`;
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
      client.invalidateQueries({ queryKey: ["organiserEvents"] });
      router.push('/organiser/events')
      close()
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
