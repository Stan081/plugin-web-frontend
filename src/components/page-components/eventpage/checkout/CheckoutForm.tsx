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
import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useMe } from "@/pages/api/query/me";
import { PhoneNumberInput } from "@/components/PhoneNumberInput";
import { useEventsContext } from "@/providers/events.provider";
import { getCookie, removeCookie } from "@/lib/cookies";

const CheckoutForm = () => {
  const { data: user } = useMe();
  const { tickets, entryData } = useEventsContext();

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

  //   toast
  const { toast } = useToast();

  const ticketCookie = getCookie("tickets");
  const entryTicketCookie = getCookie("entryTicket");

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  const hasErrors = useMemo(
    () => Object.keys(form.formState.errors).length > 0,
    [form.formState.errors]
  );

  const totalticketPrice = (): number => {
    const total = tickets.reduce((sum, item) => {
      if (item?.price) {
        return sum + item.quantity * item.price;
      }
      return sum;
    }, 0);
    return total;
  };

  const onSubmit = useCallback(async (payload: CheckoutForms) => {
    if (!payload) {
      toast({
        variant: "destructive",
        title: "Please fill in the field",
      });
    }
    if (tickets || entryData) {
      const data = {
        user: payload,
        ticket: ticketCookie ? tickets : entryData?.quantity,
        total: entryData?.quantity * entryData?.price || totalticketPrice(),
      };

      console.log(data);

      removeCookie("tickets");
      removeCookie("entryTicket");
    }
  }, []);
  return (
    <div>
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
