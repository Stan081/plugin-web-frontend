import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getToken } from "@/lib/token";
import { DELETE_BANK_ACCOUNT } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";

export const useDeleteBankAccount = () => {
  const token = getToken();

  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (accountId: string) => {
      const url = DELETE_BANK_ACCOUNT(accountId);
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
      client.invalidateQueries({ queryKey: ["GetBankAccount"] });
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
