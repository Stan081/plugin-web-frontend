import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SlotWithoutHostForm,
  SlotWithoutHostSchema,
} from "@/models/create-event-schema";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { AgendaType } from "@/lib/types/EventType";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { EventAgenda } from "@/pages/api/mutate/create-events/eventAgenda";
import { EditEventAgenda } from "@/pages/api/mutate/create-events/editEventAgenda";

interface SlotWithoutHostProps {
  handleReturnToList: () => void;
  selectedAgenda: any;
}

const EditSlotWithoutHost: FC<SlotWithoutHostProps> = ({
  handleReturnToList,
  selectedAgenda,
}) => {
  const { setIsHost, isHost: isHostValid } = useCreateEventContext();

  const form = useForm<SlotWithoutHostForm>({
    mode: "all",
    defaultValues: {
      isHost: selectedAgenda?.host ? true : false,
      agenda_title: selectedAgenda?.title ?? "",
      agenda_description: selectedAgenda?.description ?? "",
      start_time: selectedAgenda?.startTime ?? "",
      end_time: selectedAgenda?.endTime ?? "",
    },
    resolver: yupResolver(SlotWithoutHostSchema),
  });

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EditEventAgenda(data, selectedAgenda?._id),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Event Agenda has been added",
          description: `${response?.message}`,
        });
        handleReturnToList();
      }
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    },
  });

  const onSubmit = useCallback(
    async (payload: SlotWithoutHostForm) => {
      console.log(payload);

      handleReturnToList();

      // Reset form back to default values
      form.reset({
        start_time: "",
        end_time: "",
        agenda_title: "",
        agenda_description: "",
      });
    },
    [form]
  );
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 w-full h-full"
        >
          <div className="w-full">
            <div className="space-y-4 mt-5">
              <FormItem className="w-full">
                <FormLabel className="text-white" htmlFor="agenda_title">
                  Agenda Title
                </FormLabel>
                <FormField
                  control={form.control}
                  name="agenda_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter session title"
                          type="text"
                          id="agenda_title"
                          className="w-full bg-white text-black font-pally-regular"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>

              <FormItem className="w-full">
                <FormLabel className="text-white" htmlFor="agenda_description">
                  Agenda description ( Optional )
                </FormLabel>
                <FormField
                  control={form.control}
                  name="agenda_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Max  char - 200 Words"
                          id="agenda_description"
                          className="w-full bg-white text-black font-pally-regular h-32 md:h-56"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>
              <div className="flex gap-6">
                <FormItem>
                  <FormLabel className="text-white" htmlFor="start_time">
                    Start Time
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="start_time"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="0:00"
                              type="time"
                              id="start_time"
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
                <FormItem>
                  <FormLabel className="text-white" htmlFor="start_time">
                    End Time
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="end_time"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="0:00"
                              type="time"
                              id="start_time"
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
          </div>
          <div className="flex gap-7 my-4">
            <div
              onClick={handleReturnToList}
              className="p-2 rounded flex justify-center items-center bg-[#463B34] w-12 cursor-pointer"
            >
              <IoReturnDownBackOutline size={20} color="#F9B6B1" />
            </div>
            <button
              type="submit"
              className="p-2.5 rounded-lg w-full border border-white text-white hover:bg-[#463B34]"
            >
              Save Session
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditSlotWithoutHost;
