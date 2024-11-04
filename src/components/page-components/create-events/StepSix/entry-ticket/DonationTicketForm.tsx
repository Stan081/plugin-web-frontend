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
import {
  DonationForm,
  DonationFormSchema,
  PaidTicket,
  PaidTicketFormSchema,
} from "@/models/create-event-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { StepsProps } from "@/pages/create-event";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useToast } from "@/components/ui/use-toast";
import { EventEntryDonationTicket } from "@/pages/api/mutate/create-events/EventEntryDonationTicket";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/tw-components/spinner";

interface DonationTicketFormProps extends StepsProps {
  entryTicket: string;
}

const DonationTicketForm: FC<DonationTicketFormProps> = ({
  next,
  previous,
  entryTicket,
}) => {
  const { selectTicket } = useCreateEventContext();

  const form = useForm<DonationForm>({
    mode: "all",
    defaultValues: {
      ticket_type: selectTicket,
      ticket_name: "",
      ticket_quantity: null,
      min_price: null,
      max_price: null,
      start_date: null,
      end_date: null,
      start_time: "",
      end_time: "",
      ticket_perks: "",
    },
    resolver: yupResolver(DonationFormSchema),
  });

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EventEntryDonationTicket(data),
    onSuccess: (response) => {
      if (response?.message) {
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

  const onSubmit = useCallback(async (payload: DonationForm) => {
    console.log(payload);
    const data = {
      ticketCategory: payload.ticket_type,
      entryTicket: {
        entryTicketType: entryTicket,
        ticketName: payload.ticket_name,
        minPrice: payload.min_price,
        maxPrice: payload.max_price,
        ticketQuantity: payload.ticket_quantity,
        startDate: payload.start_date,
        startTime: payload.start_time,
        endDate: payload.end_date,
        endTime: payload.end_time,
        ticketPeaks: payload.ticket_perks,
        // reservation: payload.
      },
    };
    // mutate(data);
  }, []);
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 w-full h-full  lg:h-[62vh]"
        >
          <div className="flex flex-col justify-between gap-4 h-auto w-full">
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

            <FormItem className="w-full ">
              <FormLabel className="text-white" htmlFor="ticket-name">
                Ticket Quantity
              </FormLabel>
              <FormField
                control={form.control}
                name="ticket_quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter ticket name"
                        type="number"
                        id="ticket-name"
                        className="w-full bg-white text-black font-pally-regular"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>

            <div className="flex flex-row items-start gap-4">
              <FormItem className="w-1/2">
                <FormLabel className="text-white" htmlFor="min-price">
                  Minimum price
                </FormLabel>
                <FormField
                  control={form.control}
                  name="min_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="₦ Enter minimum amount"
                          type="number"
                          id="min-price"
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
                <FormLabel className="text-white" htmlFor="max-price">
                  Maximum price
                </FormLabel>
                <FormField
                  control={form.control}
                  name="ticket_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter max price"
                          type="number"
                          id="max-price"
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
                Ticket Peaks
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
                onClick={() => {}}
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

export default DonationTicketForm;
