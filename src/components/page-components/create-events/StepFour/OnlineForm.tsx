import React, { useCallback, useMemo } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  OnlineVenueLink,
  OnlineVenueLinkSchema,
} from "@/models/create-event-schema";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/tw-components/spinner";
import { EventOnlineLocation } from "@/pages/api/mutate/create-events/eventLocationType";
import { useMutation } from "@tanstack/react-query";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useGetEvent } from "@/hooks/events/useGetEvent";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import ProfileFormModal from "../../organisers/organiser-dashboard/organiser-settings/ProfileFormModal";

interface OnlineFormProps {
  locationType: string;
}

const OnlineForm: React.FC<OnlineFormProps> = ({ locationType }) => {
  const {
    nextStep: next,
    previousStep: previous,
    saveToDraft,
  } = useCreateEventContext();
  const { data: event, isLoading: loading } = useGetEvent();

  const form = useForm<OnlineVenueLink>({
    mode: "all",
    defaultValues: {
      venue_platform: event?.data?.onlineLocation?.onlineVenue ?? "",
      venue_link: event?.data?.onlineLocation?.venueLink ?? "",
    },
    resolver: yupResolver(OnlineVenueLinkSchema),
  });

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EventOnlineLocation(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Uploaded Successfully",
          description: `${response?.message}`,
        });
        next();
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

  const onSubmit = useCallback(async (payload: OnlineVenueLink) => {
    const data = {
      locationType,
      onlineLocation: {
        onlineVenue: payload?.venue_platform,
        venueLink: payload?.venue_link,
      },
    };
    console.log(data);
    mutate(data);
  }, []);
  return (
    <div>
      {loading && <SpinnerOverlay />}

      <h4 className="font-pally-medium md:text-lg">Virtual Address</h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 w-full h-full"
        >
          <div className="pb-10 h-[50vh] whitespace-normal overflow-y-auto">
            <div className="grid grid-cols-3 gap-5">
              <FormItem className="col-span-1">
                <FormLabel className="text-white">Online Venue</FormLabel>
                <FormField
                  control={form.control}
                  name="venue_platform"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            defaultValue={String(field.value)}
                          >
                            <SelectTrigger className="border h-10 py-1 flex justify-between bg-white text-black items-center gap-2 rounded-md p-2 w-full">
                              <SelectValue placeholder="Select venue" />
                            </SelectTrigger>
                            <SelectContent className="w-full border z-40 bg-primary-foreground rounded-sm bg-white">
                              {["Google Meet", "Zoom"].map((state, index) => {
                                return (
                                  <SelectItem key={index} value={state}>
                                    <div className="flex items-center gap-2">
                                      {state}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FormItem>
              <FormItem className="col-span-2">
                <FormLabel className="text-white" htmlFor="venue_link">
                  Venue Link
                </FormLabel>
                <FormField
                  control={form.control}
                  name="venue_link"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="https://example.com"
                            type="text"
                            id="venue_link"
                            className="bg-white text-black font-pally-regular"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FormItem>
            </div>
          </div>
          <div className="sticky z-50 bottom-0 bg-[#281E17]">
            <Separator />
            <div className="py-5 flex justify-between items-center">
              <Button
                onClick={saveToDraft}
                variant="outline"
                className="text-white border-white hover:bg-[#6c5442]"
              >
                Save Progress
              </Button>

              <div className="flex items-center gap-8">
                <Button
                  onClick={previous}
                  className="cursor-pointer hover:outline hover:outline-white/50 p-2 rounded-lg"
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  disabled={isPending}
                  variant="destructive"
                >
                  {isPending ? <Spinner /> : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OnlineForm;
