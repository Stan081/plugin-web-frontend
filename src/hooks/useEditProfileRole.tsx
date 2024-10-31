import { useToast } from "@/components/ui/use-toast";
import { EditProfileRole } from "@/pages/api/mutate/EditProfile";
import { useMutation } from "@tanstack/react-query";

export const useEditProfileRole = () => {
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EditProfileRole(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "User role has been updated",
          description: `${response?.message}`,
        });
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    },
  });

  return { mutate, isPending };
};
