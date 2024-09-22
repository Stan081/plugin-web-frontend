"use client";
import { FreeTicket, FreeTicketFormSchema } from "@/models/create-event-schema";
import { StepsProps } from "@/pages/create-event";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCreateEventContext } from "@/providers/create_event.provider";

interface FreeTicketFormProps extends StepsProps {}

const FreeTicketForm: FC<FreeTicketFormProps> = ({ previous, next }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const { selectTicket } = useCreateEventContext();

  const form = useForm<FreeTicket>({
    mode: "all",
    defaultValues: {
      ticket_type: selectTicket,
      ticket_name: "",
      ticket_quantity: quantity,
      start_date: new Date(),
      end_date: new Date(),
      start_time: "",
      end_time: "",
    },
    resolver: yupResolver(FreeTicketFormSchema),
  });

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  //   handle increment on slot
  const handleIncrement = () => {
    setQuantity((prev) => {
      return prev + 1;
    });
  };

  //   handle decrement on slot
  const handleDecrement = () => {
    setQuantity((prev) => {
      if (prev < 1) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  };

  const onSubmit = useCallback(async (payload: FreeTicket) => {
    console.log(payload);
    // next();
  }, []);
  return (
    <div className="w-full h-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-20 w-full h-full"
        >
          <div>
            <div className="flex flex-col justify-between gap-4 w-full h-full">
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>

              <div className="mt-3 ">
                <p className="font-pally-regular text-sm mb-2">Quantity</p>
                <div className="flex gap-4">
                  <div
                    onClick={handleDecrement}
                    className={` w-12 h-10 text-center text-xl flex justify-center items-center rounded bg-white text-black hover:bg-white/90 cursor-pointer`}
                  >
                    -
                  </div>
                  <div className="w-full h-10 text-center flex justify-center items-center rounded bg-white text-black ">
                    {quantity}
                  </div>
                  <div
                    onClick={handleIncrement}
                    className={` w-12 h-10 text-center flex justify-center items-center text-xl rounded bg-white text-black hover:bg-white/90 cursor-pointer`}
                  >
                    +
                  </div>
                </div>
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
            </div>
          </div>

          <div className="sdsticky bottom-0 bg-[#281E17]">
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

                <Button type="submit" variant="destructive">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FreeTicketForm;
