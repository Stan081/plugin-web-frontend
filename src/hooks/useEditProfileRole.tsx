import { useToast } from "@/components/ui/use-toast";
import { EditProfileRole } from "@/pages/api/mutate/EditProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditProfileRole = () => {
  const { toast } = useToast();
  const client = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EditProfileRole(data),
    onSuccess: (response) => {
      if (response?.message) {
        client.invalidateQueries({ queryKey: ["me"] });
        // toast({
        //   variant: "success",
        //   title: "User role has been updated",
        //   description: `${response?.message}`,
        // });
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "An unexpected error occurred, please try again later",
      });
    },
  });

  return { mutate, isPending };
};
