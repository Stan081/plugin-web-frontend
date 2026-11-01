import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "@/lib/cookies";
import { API_URL } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useToast } from "@/components/ui/use-toast";

// Stop or resume sales of one ticket type. Works on published and live events
// too: existing ticket types can't be edited once an event is published, but
// their sales can always be switched off (and back on).
export const useSetTicketSale = (eventId?: string) => {
  const token = getToken();
  const client = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ ticketId, active }: { ticketId: string; active: boolean }) => {
      const id = eventId || String(getCookie("event_id") ?? "");
      return axios
        .patch(
          `${API_URL}/event/${id}/tickets/${ticketId}/sale`,
          { active },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => res.data)
        .catch((err) => {
          throw new Error(err?.response?.data?.message || err.message);
        });
    },
    onSuccess: (data) => {
      toast({ variant: "success", title: data?.message ?? "Saved" });
      client.invalidateQueries({ queryKey: ["groupEvents"] });
      client.invalidateQueries({ queryKey: ["eventById"] });
      client.invalidateQueries({ queryKey: ["organiserEventLiveStats"] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Couldn't change ticket sales",
        description: error?.message,
      });
    },
  });
};
