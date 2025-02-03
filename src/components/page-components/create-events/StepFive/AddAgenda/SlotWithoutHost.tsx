"use client";

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
import React, { FC, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { isHostTypes } from "./SlotWithHost";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AgendaSlotProps } from "./Slot";
import { Button } from "@/components/ui/button";
import Spinner from "@/tw-components/spinner";
import { EventAgenda } from "@/pages/api/mutate/create-events/eventAgenda";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

interface SlotWithoutHostProps extends AgendaSlotProps {}

const SlotWithoutHost: FC<SlotWithoutHostProps> = ({ handleReturnToList }) => {
  const { setIsHost, isHost } = useCreateEventContext();

  const form = useForm<SlotWithoutHostForm>({
    mode: "all",
    defaultValues: {
      agenda_title: "",
      agenda_description: "",
      start_time: "",
      end_time: "",
    },
    resolver: yupResolver(SlotWithoutHostSchema),
  });

  const { toast } = useToast();

  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EventAgenda(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Event Agenda has been added",
          description: `${response?.message}`,
        });
        client.invalidateQueries({ queryKey: ["eventAgendas"] });
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

      const data = {
        title: payload?.agenda_title,
        description: payload?.agenda_description,
        startTime: payload?.start_time,
        endTime: payload?.end_time,
      };

      mutate(data);
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
            <div className="flex justify-start items-baseline gap-4">
              <p className="font-pally-regular text-base md:text-lg">
                Do you have a Host?
              </p>
              <div className="flex flex-wrap gap-4 text-white">
                {isHostTypes.map(
                  (type: { id: boolean; name: string }, index) => (
                    <button
                      key={index}
                      onClick={() => setIsHost(!isHost)}
                      className={`py-0.5 lg:py-2 px-3 lg:px-4 rounded-full border ${
                        isHost === type.id
                          ? "bg-white text-black"
                          : "border-white"
                      }`}
                    >
                      {type.name}
                    </button>
                  )
                )}
              </div>
            </div>
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
              <div className="flex gap-6 w-full">
                <FormItem className="w-full lg:w-auto">
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
                              className="bg-white text-black font-pally-regular w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </FormItem>
                <FormItem className="w-full lg:w-auto">
                  <FormLabel className="text-white" htmlFor="start_end">
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
                              className="bg-white w-full text-black font-pally-regular"
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
          <div className="flex justify-end gap-4 my-4">
            <Button
              variant="outline"
              onClick={handleReturnToList}
              className="border bg-white"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} variant="destructive">
              {isPending ? <Spinner /> : "Save Session"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SlotWithoutHost;
