import { useToast } from "@/components/ui/use-toast";
import { UpdateOrganiserProfile } from "@/pages/api/mutate/organiser/UpdateOrganiserProfile";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateOrganiserProfile = () => {
    const {handleCloseProfile} = useOrganiserDashContext()
  const { toast } = useToast();
  const client = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => UpdateOrganiserProfile(data),
    onSuccess: (response) => {
      if (response?.data) {
        toast({
          variant: "success",
          title: "Your profile has been updated",
          description: `${response?.message}`,
        });
        client.invalidateQueries({ queryKey: ["organiserProfile"] });
        handleCloseProfile()
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error?.message,
      });
    },
  });

  return { mutate, isPending };
};
