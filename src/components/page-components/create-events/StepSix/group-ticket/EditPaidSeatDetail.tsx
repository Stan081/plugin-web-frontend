"use client";
import {
  PaidSeatSection,
  PaidSeatSectionFormSchema,
} from "@/models/create-event-schema";
import {

  useCreateEventContext,
} from "@/providers/create_event.provider";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC, useCallback, useEffect} from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditEventGroup } from "@/pages/api/mutate/create-events/EditEventGroup";
import Spinner from "@/tw-components/spinner";
import { Button } from "@/components/ui/button";

interface EditPaidSeatDetailProps {
  handleReturnToList: () => void;
  selectedTicket: any;
}

const EditPaidSeatDetail: FC<EditPaidSeatDetailProps> = ({
  handleReturnToList,
  selectedTicket,
}) => {
  const {
    selectTicket,
    seatType: seatTypeState,
    handleClick,
  } = useCreateEventContext();

  const form = useForm<PaidSeatSection>({
    mode: "all",
    defaultValues: {
      seat_type: selectedTicket?.seatType ?? seatTypeState,
      ticket_type: selectedTicket?.selectTicket,
      ticket_name: selectedTicket?.ticketName ?? "",
      ticket_category: selectedTicket?.ticketCategory ?? "",
      ticket_quantity: selectedTicket?.ticketQuantity,
      ticket_price: selectedTicket?.ticketPrice,
      start_date: new Date(selectedTicket?.startDate) ?? null,
      end_date: new Date(selectedTicket?.endDate) ?? null,
      start_time: selectedTicket?.startTime ?? "",
      end_time: selectedTicket?.endTime ?? "",
      ticket_perks: selectedTicket?.ticketPerks ?? "",
    },
    resolver: yupResolver(PaidSeatSectionFormSchema),
  });

  useEffect(() => {
    form.setValue("seat_type", seatTypeState);
  }, [seatTypeState, form.setValue]);

  useEffect(() => {
    form.setValue("ticket_type", selectTicket);
  }, [selectTicket, form.setValue]);

  const { toast } = useToast();

  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EditEventGroup(data, selectedTicket?._id),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Your paid group event ticket has been updated",
          description: `${response?.message}`,
        });
        client.invalidateQueries({ queryKey: ["groupEvents"] });
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

  const onSubmit = useCallback((payload: PaidSeatSection) => {

    const data = {
      groupedTicketType: payload.seat_type,
      ticketName: payload.ticket_name,
      ticketCategory: payload.ticket_category,
      ticketQuantity: payload.ticket_quantity,
      ticketPrice: payload.ticket_price,
      startDate: payload.start_date,
      startTime: payload.start_time,
      endDate: payload.end_date,
      endTime: payload.end_time,
      ticketPeaks: payload.ticket_perks,
      seatMap: payload.label_image,
      color: payload.label_color,
    };
    mutate(data);
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

            <div className="flex flex-col md:flex-row items-start gap-4">
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

          <div className="flex gap-4 mb-4">
            <div
              onClick={handleReturnToList}
              className="p-2 rounded flex justify-center items-center bg-[#463B34] cursor-pointer"
            >
              <p className="text-white font-pally-regular">Cancel</p>
            </div>
            <Button
              type="submit"
              className="w-full"
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? <Spinner /> : `Save edit`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditPaidSeatDetail;
