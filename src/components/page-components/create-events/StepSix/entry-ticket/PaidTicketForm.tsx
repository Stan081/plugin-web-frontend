"use client";
import React, { FC, useCallback, useMemo, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PaidTicket, PaidTicketFormSchema } from "@/models/create-event-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventEntryPaidTicket } from "@/pages/api/mutate/create-events/EventEntryTicket";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/tw-components/spinner";
import { useGetEvent } from "@/hooks/events/useGetEvent";

interface PaidTicketFormProps {
  entryTicket: string;
}

const PaidTicketForm: FC<PaidTicketFormProps> = ({ entryTicket }) => {
  const {
    selectTicket,
    nextStep: next,
    previousStep: previous,
    saveToDraft,
  } = useCreateEventContext();

  const { data: eventId } = useGetEvent();


  const { toast } = useToast();
  
  const client = useQueryClient();

  const form = useForm<PaidTicket>({
    mode: "all",
    defaultValues: {
      ticket_type: eventId?.data?.ticketCategory ?? selectTicket,
      ticket_name:
        eventId?.data?.entryTicket?.entryTicketType === "paid"
          ? eventId?.data?.entryTicket?.ticketName
          : "",
      ticket_quantity:
        eventId?.data?.entryTicket?.entryTicketType === "paid"
          ? eventId?.data?.entryTicket?.ticketQuantity
          : null,
      ticket_price:
        eventId?.data?.entryTicket?.entryTicketType === "paid"
          ? eventId?.data?.entryTicket?.ticketPrice
          : null,
      start_date:
        eventId?.data?.entryTicket?.entryTicketType === "paid"
          ? new Date(eventId?.data?.entryTicket?.startDate)
          : null,
      end_date:
        eventId?.data?.entryTicket?.entryTicketType === "paid"
          ? new Date(eventId?.data?.entryTicket?.endDate)
          : null,
      start_time:
        eventId?.data?.entryTicket?.entryTicketType === "paid"
          ? eventId?.data?.entryTicket?.startTime
          : "",
      end_time:
        eventId?.data?.entryTicket?.entryTicketType === "paid"
          ? eventId?.data?.entryTicket?.endTime
          : "",
      ticket_perks:
        eventId?.data?.entryTicket?.entryTicketType === "paid"
          ? eventId?.data?.entryTicket?.ticketPeaks
          : "Refer to event flyer for more details",
    },
    resolver: yupResolver(PaidTicketFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EventEntryPaidTicket(data),
    onSuccess: (response) => {
      if (response?.message) {
        client.invalidateQueries({ queryKey: ["eventById"]});
        toast({
          variant: "success",
          title: ` Your ${entryTicket} ticket has been added`,
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

  const onSubmit = useCallback(async (payload: PaidTicket) => {
    if (payload?.start_date > payload?.end_date) {
      alert("Start date cannot be after the end date");
      return;
    }
    const data = {
      ticketCategory: payload.ticket_type,
      entryTicket: {
        entryTicketType: entryTicket,
        ticketName: payload.ticket_name,
        ticketPrice: payload.ticket_price,
        ticketQuantity: payload.ticket_quantity,
        startDate: payload.start_date,
        startTime: payload.start_time,
        endDate: payload.end_date,
        endTime: payload.end_time,
        ticketPeaks: payload.ticket_perks,
      },
    };
    mutate(data);
  }, []);
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 w-full"
        >
          <div className="flex flex-col justify-between gap-4 w-full">
            <FormItem className="w-full ">
              <FormLabel className="text-white" htmlFor="ticket-name">
                Ticket Name
              </FormLabel>
              <FormField
                control={form.control}
                name="ticket_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter ticket name - max 200 characters"
                        type="text"
                        id="ticket-name"
                        className="w-full bg-white text-black font-pally-regular"
                        {...field}
                        maxLength={200}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>

            <div className="flex items-start gap-4">
              <FormItem className="w-1/2">
                <FormLabel className="text-white" htmlFor="price-pass">
                  Price ( per ticket )
                </FormLabel>
                <FormField
                  control={form.control}
                  name="ticket_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="₦ Enter amount"
                          type="number"
                          id="price-pass"
                          className="w-full bg-white text-black font-pally-regular"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>
              <FormItem className="w-1/2 ">
                <FormLabel className="text-white" htmlFor="ticket-quantity">
                  Ticket Quantity
                </FormLabel>
                <FormField
                  control={form.control}
                  name="ticket_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter ticket quantity"
                          type="number"
                          id="ticket-quantity"
                          className="w-full bg-white text-black font-pally-regular"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>
            </div>

            <div className="flex items-start gap-4">
              <FormItem className="w-full">
                <FormLabel className="text-white" htmlFor="start_date">
                  Sales starts on
                </FormLabel>
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => {
                    const formattedDate =
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : field.value;

                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="DD/MM/YY"
                            type="date"
                            id="start_date"
                            className=" bg-white text-black font-pally-regular"
                            {...field}
                            value={formattedDate}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FormItem>
              <FormItem className="w-full">
                <FormLabel className="text-white" htmlFor="start_time">
                  Sales start time
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
            </div>

            <div className="flex items-start gap-4">
              <FormItem className="w-full">
                <FormLabel className="text-white" htmlFor="end_date">
                  Sales end on
                </FormLabel>
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => {
                    const formattedDate =
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : field.value;

                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="DD/MM/YY"
                            type="date"
                            id="end_date"
                            className=" bg-white text-black font-pally-regular"
                            {...field}
                            value={formattedDate}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FormItem>
              <FormItem className="w-full">
                <FormLabel className="text-white" htmlFor="end_time">
                  Sales end time
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
                            id="end_time"
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
            <FormItem>
              <FormLabel className="text-white" htmlFor="ticket_perks">
                Ticket Peaks (Optional)
              </FormLabel>
              <FormField
                control={form.control}
                name="ticket_perks"
                render={({ field }) => (
                  <FormControl>
                    <Textarea
                      placeholder="Max  char - 200 Words"
                      id="ticket_perks"
                      className="w-full bg-white text-black font-pally-regular h-32 md:h-56"
                      {...field}
                    />
                  </FormControl>
                )}
              />
              <FormMessage />
            </FormItem>
          </div>

          <div className="sticky bottom-0 bg-[#281E17]">
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
                  variant="destructive"
                  disabled={isPending}
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

export default PaidTicketForm;
