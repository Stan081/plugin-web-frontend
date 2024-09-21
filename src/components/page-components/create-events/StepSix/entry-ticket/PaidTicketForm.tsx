"use client"
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
import { toFiat } from "@/lib/amount";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { StepsProps } from "@/pages/create-event";

interface PaidTicketFormProps extends StepsProps {
  selectTicket: string;
}

const PaidTicketForm: FC<PaidTicketFormProps> = ({
  next,
  previous,
  selectTicket,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [ticketPrice, setTicketPrice] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);

  const form = useForm<PaidTicket>({
    mode: "all",
    defaultValues: {
      ticket_type: selectTicket,
      ticket_name: "",
      ticket_quantity: quantity,
      discount_price: discountedPrice,
      ticket_price: ticketPrice,
      start_date: new Date(),
      end_date: new Date(),
      start_time: "",
      end_time: "",
      ticket_peaks: "",
    },
    resolver: yupResolver(PaidTicketFormSchema),
  });

  React.useEffect(() => {
    console.log("Ticket Price: ", ticketPrice);
    console.log("Discount Percentage: ", discountPercentage);
    const finalPrice = calculateDiscountedPrice(
      ticketPrice,
      discountPercentage
    );

    console.log("Final Price: ", finalPrice);
    setDiscountedPrice(finalPrice);
  }, [ticketPrice, discountPercentage, discountedPrice]);

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

  // Function to calculate the discount
  const calculateDiscountedPrice = (price: number, discount: number) => {
    if (!ticketPrice || ticketPrice <= 0 || (!discount && discount > 99)) {
      return 0; // Toast error
    }
    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;
    return parseFloat(finalPrice.toFixed(2));
  };

  const handlePriceChange = (e) => {
    const price = parseFloat(e.target.value);
    setTicketPrice(price);
  };

  const onSubmit = useCallback(async (payload: PaidTicket) => {
    console.log(payload);
    // next();
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
                          disabled={isLoading}
                          className="w-full bg-white text-black font-pally-regular"
                          value={ticketPrice}
                          onChange={(e) => {
                            field.onChange(e);
                            handlePriceChange(e);
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>
              <div className="flex gap-4 w-1/2">
                <FormItem className="w-1/2">
                  <FormLabel
                    className="text-white whitespace-nowrap"
                    htmlFor="discount-percentage"
                  >
                    Discount price (if applicable)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter discount %"
                      type="number"
                      id="discount-percentage"
                      className="w-full bg-white text-black font-pally-regular"
                      value={discountPercentage}
                      onChange={(e) =>
                        setDiscountPercentage(Number(e.target.value))
                      }
                    />
                  </FormControl>
                </FormItem>

                {/* Render the discounted price */}
                <div className="items-center bg-[#281E17] rounded-md w-full gap-2">
                  <p className="mb-2 font-pally-regular ">
                    Discounted Price: ₦
                  </p>
                  <div
                    id="discount-percentage"
                    className="bg-[#33271e] border-none text-white font-pally-regular flex items-center h-10 rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  >
                    {toFiat(discountedPrice)}
                  </div>
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

            <FormItem>
              <FormLabel className="text-white" htmlFor="ticket_peaks">
                Ticket Peaks
              </FormLabel>
              <FormField
                control={form.control}
                name="ticket_peaks"
                render={({ field }) => (
                  <FormControl>
                    <Textarea
                      placeholder="Max  char - 200 Words"
                      id="event_description"
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

export default PaidTicketForm;
