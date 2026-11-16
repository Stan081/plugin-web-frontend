import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "@/lib/cookies";
import { API_URL } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useToast } from "@/components/ui/use-toast";

// Move when sales of one ticket type open and/or close. Works on published and
// live events too, so sales that have ended can be reopened. Not allowed once
// the event is over.
export const useSetTicketSaleWindow = (eventId?: string) => {
  const token = getToken();
  const client = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      ticketId,
      saleOpensAt,
      saleClosesAt,
    }: {
      ticketId: string;
      saleOpensAt?: string;
      saleClosesAt?: string;
    }) => {
      const id = eventId || String(getCookie("event_id") ?? "");
      return axios
        .patch(
          `${API_URL}/event/${id}/tickets/${ticketId}/sale-window`,
          { saleOpensAt, saleClosesAt },
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
        title: "Couldn't change the sale dates",
        description: error?.message,
      });
    },
  });
};
