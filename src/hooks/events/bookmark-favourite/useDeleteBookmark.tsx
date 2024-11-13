import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "@/lib/token";
import { EVENT_FAVOURITE } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";

export const useDeleteBookmark = (id:string) => {
  const token = getToken();

  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: () => {
      const url = EVENT_FAVOURITE + `/${id}`;
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
        title: "Bookmark has been removed",
      });
      client.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to remove bookmark",
        description: error?.message,
      });
    },
  });
};
