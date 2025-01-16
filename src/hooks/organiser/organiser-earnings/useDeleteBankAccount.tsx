import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "@/lib/token";
import { CHECK_BANK_STATUS } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";

export const useDeleteBankAccount = () => {
  const token = getToken();

  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationFn: () => {
      const url = CHECK_BANK_STATUS() ;
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
        title: "Your bank account has been deleted",
      });
      client.invalidateQueries({ queryKey: ["CheckAccountStatus"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to delete bank account",
        description: error?.message,
      });
    },
  });
};
