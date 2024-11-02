import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "@/lib/token";
import { EVENT_VENDOR } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";

export const useDeleteVendor = () => {
  const token = getToken();

  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ vendorId }: { vendorId: number }) => {
      const url = EVENT_VENDOR() + `/${vendorId}`;
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
        title: "Your event vendor has been deleted",
      });
      client.invalidateQueries({ queryKey: ["eventVendors"] });
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
