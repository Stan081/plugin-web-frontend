import {
  SeatSection,
  SeatSectionFormSchema,
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
import { SeatSectionListsType } from "@/static-datas/create-event";

interface SeatDetailsProps {
  handleReturnToList: () => void;
  handleCreateVendor?: (vendorData: SeatSectionListsType) => void;
}

export const seatedTypes: { id: string; name: string }[] = [
  {
    id: "paid",
    name: "Paid Ticket",
  },
  {
    id: "free",
    name: "Free Ticket",
  },
];

const SeatDetails: FC<SeatDetailsProps> = ({
  handleReturnToList,
  handleCreateVendor,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const { selectTicket } = useCreateEventContext();
  const [ticketPrice, setTicketPrice] = useState<number>(0);
  const [seatType, setSeatType] = useState<string>("paid");

  const form = useForm<SeatSection>({
    mode: "all",
    defaultValues: {
      seat_type: seatType,
      ticket_type: selectTicket,
      ticket_name: "",
      ticket_category: "",
      ticket_quantity: quantity,
      ticket_price: ticketPrice,
      start_date: new Date(),
      end_date: new Date(),
      start_time: "",
      end_time: "",
      ticket_perks: "",
    },
    resolver: yupResolver(SeatSectionFormSchema),
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

  useEffect(() => {
    form.setValue("ticket_price", ticketPrice);
  }, [ticketPrice, form.setValue]);

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  //   handle increment
  const handleIncrement = () => {
    setQuantity((prev) => {
      return prev + 1;
    });
  };

  //   handle decrement
  const handleDecrement = () => {
    setQuantity((prev) => {
      if (prev < 1) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  };

  const handleClick = (id: string) => {
    setSeatType(id);
  };

  const onSubmit = useCallback(async (payload: SeatSection) => {
    console.log(payload);
    handleCreateVendor({
      seatType: payload.seat_type,
      ticketName: payload.ticket_name,
      ticketCategory: payload.ticket_category,
      ticketQuantity: payload.ticket_quantity,
      ticketPerks: payload.ticket_perks,
      ticketPrice: payload.ticket_price,
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
      ticket_price: ticketPrice,
      start_date: new Date(),
      end_date: new Date(),
      start_time: "",
      end_time: "",
      ticket_perks: "",
    });
  }, []);

  return (
    <div>
      <div className="flex justify-start items-end gap-5 mb-6">
        <h3 className="font-pally-medium md:text-xl">
          Specify your ticket type
        </h3>

        <div className="flex flex-wrap gap-4 mt-5 text-white">
          {seatedTypes.map((seat) => (
            <button
              key={seat.id}
              onClick={() => handleClick(seat.id)}
              className={`py-2 px-4 rounded-full border ${
                seatType === seat.id ? "bg-white text-black" : "border-white"
              }`}
            >
              {seat.name}
            </button>
          ))}
        </div>
      </div>
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

            <FormItem>
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
                        disabled={isLoading}
                        className="w-full bg-white text-black font-pally-regular"
                        value={ticketPrice}
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
            {/* <div
              onClick={() => {
                SeatSectionLists.length !== 0
                  ? setIsSeatForm(false)
                  : setIsSeatForm(true);
              }}
              className="p-2 rounded flex justify-center items-center bg-[#463B34] w-12 cursor-pointer"
            >
              <IoReturnDownBackOutline size={20} color="#F9B6B1" />
            </div> */}
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

export default SeatDetails;
