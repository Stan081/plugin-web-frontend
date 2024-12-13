import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CheckoutForms, CheckoutFormSchema } from "@/models/auth";
import Spinner from "@/tw-components/spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMe } from "@/pages/api/query/me";
import { PhoneNumberInput } from "@/components/PhoneNumberInput";
import { useEventsContext } from "@/providers/events.provider";
import { getCookie, removeCookie } from "@/lib/cookies";
import { CheckoutProps } from "./CheckoutContactInfo";
import { useMutation } from "@tanstack/react-query";
import { Checkout } from "@/pages/api/mutate/tickets/checkout-api";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useGetCountry } from "@/pages/api/query/country";

const CheckoutForm = ({ eventId }: CheckoutProps) => {
  const { data: user } = useMe();
  const { tickets, entryData } = useEventsContext();
  const { data: country } = useGetCountry();

  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: any) => Checkout(data),
    onSuccess: (response) => {
      if (response?.data?.paymentLink) {
        const paymentLink = response.data.paymentLink;

        // Validate payment link
        try {
          const url = new URL(paymentLink); // Ensures it's a valid URL
          toast({
            variant: "success",
            title: "Payment link generated successfully",
            description: `${response?.message}`,
          });
          router.push(url.toString());
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Invalid Payment Link",
            description:
              "The returned payment link is invalid. Please try again.",
          });
        }
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Something went wrong. Try again",
        description: error?.message,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      removeCookie("tickets");
      removeCookie("entryTicket");
    }
  }, [isSuccess]);

  const form = useForm<CheckoutForms>({
    mode: "all",
    defaultValues: {
      first_name: user?.data?.name?.firstname || "",
      last_name: user?.data?.name?.lastname || "",
      email: user?.data?.email || "",
      phone_number: user?.data?.contact?.phone || "",
      isUpdated: false,
      isEmail: false,
    },
    resolver: yupResolver(CheckoutFormSchema),
  });

  const ticketCookie = getCookie("tickets");
  const entryTicketCookie = getCookie("entryTicket");

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  const hasErrors = useMemo(
    () => Object.keys(form.formState.errors).length > 0,
    [form.formState.errors]
  );

  const onSubmit = useCallback((payload: CheckoutForms) => {
    if (!payload) {
      toast({
        variant: "destructive",
        title: "Please fill in the field",
      });
    }
    if (tickets || entryData) {
      const data = {
        eventId: eventId,
        firstname: payload?.first_name,
        lastname: payload?.last_name,
        email: payload?.email,
        phone: payload?.phone_number,
        country: country?.country_name ? country?.country_name : "Nigeria",
        tickets: ticketCookie ? tickets : [entryData],
      };

      mutate(data);
    }
  }, []);

  return (
    <div>
      {isPending && <SpinnerOverlay />}
      <Form {...form}>
        <form
          onClick={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-5"
        >
          <div className="flex gap-4">
            <FormItem className="w-full">
              <FormLabel
                className="text-[#515A6A]
              "
              >
                First name
              </FormLabel>
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
                        type="text"
                        id="first_name"
                        className="w-full bg-white font-pally-regular"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>
            <FormItem className="w-full">
              <FormLabel className="text-[#515A6A]">Last name</FormLabel>
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        type="text"
                        id="last_name"
                        className="w-full bg-white font-pally-regular"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>
          </div>
          <FormItem className="w-full">
            <FormLabel className="text-[#515A6A]">Email address</FormLabel>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="youraddress@email.com"
                      type="text"
                      id="email_address"
                      className="w-full bg-white font-pally-regular"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormItem>

          <FormItem>
            <FormLabel className="text-[#515A6A]">Phone number</FormLabel>
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PhoneNumberInput
                      {...field}
                      placeholder="Phone Number"
                      defaultCountry="NG"
                      id="phone_number"
                      type="text"
                      style={{ outline: "none", border: "none" }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormItem>

          {/* <FormField
            control={form.control}
            name="isUpdated"
            render={({ field }) => (
              <FormItem className="space-x-1 flex items-end">
                <FormControl>
                  <Checkbox
                    id="update-checkout"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <FormLabel id="update-checkout" className="text-[#515A6A]">
                  Use different settings for my mobile devices
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isEmail"
            render={({ field }) => (
              <FormItem className="space-x-1 flex items-end">
                <FormControl>
                  <Checkbox
                    id="update-checkout"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <FormLabel id="update-checkout" className="text-[#515A6A]">
                  Send me emails about the best events happening nearby or
                  online.
                </FormLabel>
              </FormItem>
            )}
          /> */}

          <p className="text-sm font-pally-regular text-[#515A6A]">
            By clicking Register, I agree to the Plugin Terms of Service
          </p>

          <Button
            disabled={isLoading || hasErrors}
            variant="destructive"
            type="submit"
            className="mt-4"
          >
            {isLoading ? <Spinner /> : "Proceed to make payment"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
