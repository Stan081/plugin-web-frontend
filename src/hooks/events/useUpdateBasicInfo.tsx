import { useToast } from "@/components/ui/use-toast";
import { UpdateBasicInfo } from "@/pages/api/mutate/create-events/UpdateBasicInfo";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateBasicInfo = () => {
  const { nextStep: next } = useCreateEventContext();
  const { toast } = useToast();
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => UpdateBasicInfo(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Basic info has been updated",
          description: `${response?.message}`,
        });
        client.invalidateQueries({ queryKey: ["eventById"] });
        next();
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error?.message,
      });
    },
  });

  return { mutate, isPending };
};
