"use client";

import {
  FreeSeatSection,
  FreeSeatSectionFormSchema,
} from "@/models/create-event-schema";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GroupSeatProps } from "./GroupSeat";

interface FreeGroupSeatsFormProps extends GroupSeatProps {}

const FreeGroupSeatsForm: FC<FreeGroupSeatsFormProps> = ({
  handleReturnToList,
  handleCreateVendor,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const { selectTicket, seatType } = useCreateEventContext();

  const form = useForm<FreeSeatSection>({
    mode: "all",
    defaultValues: {
      seat_type: seatType,
      ticket_type: selectTicket,
      ticket_name: "",
      ticket_category: "",
      ticket_quantity: quantity,
      start_date: new Date(),
      end_date: new Date(),
      start_time: "",
      end_time: "",
      ticket_perks: "",
    },
    resolver: yupResolver(FreeSeatSectionFormSchema),
  });

  useEffect(() => {
    form.setValue("seat_type", seatType);
  }, [seatType, form.setValue]);

  useEffect(() => {
    form.setValue("ticket_type", selectTicket);
  }, [selectTicket, form.setValue]);

  useEffect(() => {
    form.setValue("ticket_quantity", quantity);
  }, [quantity, form.setValue]);

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  const onSubmit = useCallback(async (payload: FreeSeatSection) => {
    console.log(payload);
    handleCreateVendor({
      seatType: payload.seat_type,
      ticketName: payload.ticket_name,
      ticketCategory: payload.ticket_category,
      ticketQuantity: payload.ticket_quantity,
      ticketPerks: payload.ticket_perks,
      startDate: payload.start_date,
      endDate: payload.end_date,
      startTime: payload.start_time,
      endTime: payload.end_time,
    });
    handleReturnToList();

    form.reset({
      seat_type: seatType,
      ticket_type: selectTicket,
      ticket_name: "",
      ticket_category: "",
      ticket_quantity: quantity,
      start_date: new Date(),
      end_date: new Date(),
      start_time: "",
      end_time: "",
      ticket_perks: "",
    });
  }, []);
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-10 w-full h-full "
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
                        placeholder="Enter ticket name"
                        type="text"
                        id="ticket-name"
                        disabled={isLoading}
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

            <FormItem className="col-span-1">
              <FormLabel className="text-white">Ticket category</FormLabel>
              <FormField
                control={form.control}
                name="ticket_category"
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
                            {["Non-seated", "Seated"].map((state, index) => {
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

            <FormItem className="w-1/2 ">
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
                        disabled={isLoading}
                        className="w-full bg-white text-black font-pally-regular"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>

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
                            disabled={isLoading}
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
                            disabled={isLoading}
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
                            disabled={isLoading}
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
                            disabled={isLoading}
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
                      disabled={isLoading}
                      className="w-full bg-white text-black font-pally-regular h-32 md:h-56"
                      {...field}
                    />
                  </FormControl>
                )}
              />
              <FormMessage />
            </FormItem>
          </div>

          <div className="flex gap-4 mb-4">
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

export default FreeGroupSeatsForm;
