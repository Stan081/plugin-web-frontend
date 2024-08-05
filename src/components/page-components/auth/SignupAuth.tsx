import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupFields, SignupSchema } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { PhoneNumberInput } from "@/components/PhoneNumberInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spinner from "@/tw-components/spinner";

const SignupAuth = () => {
  const form = useForm<SignupFields>({
    mode: "all",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: null,
    },
    resolver: yupResolver(SignupSchema),
  });

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  const onSubmit = useCallback(async (payload: SignupFields) => {
    console.log(payload);
  }, []);
  return (
    <div>
      <Form {...form}>
        <form
          onClick={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 my-5"
        >
          <FormItem className="w-full">
            <FormLabel className="text-white">First name</FormLabel>
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your first name"
                      type="text"
                      autoCorrect="off"
                      id="first_name"
                      disabled={isLoading}
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
            <FormLabel className="text-white">Last name</FormLabel>
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your last name"
                      type="text"
                      autoCorrect="off"
                      id="last_name"
                      disabled={isLoading}
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
            <FormLabel className="text-white">Email address</FormLabel>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="youraddress@email.com"
                      type="text"
                      autoCorrect="off"
                      id="email_address"
                      disabled={isLoading}
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
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <FormLabel className="text-white">Phone Number</FormLabel>
                  <FormControl>
                    <PhoneNumberInput
                      {...field}
                      placeholder="Phone Number"
                      defaultCountry="NG"
                      disabled={isLoading}
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
          <Button
            disabled={isLoading}
            variant="destructive"
            type="submit"
            className="mt-8"
          >
            {isLoading ? <Spinner /> : "Create account"}
          </Button>
        </form>
      </Form>

      <div className="flex gap-2 mt-10">
        <p className="text-[#98A2B3] font-pally-regular">
          Already have an account?
        </p>
        <Link href={"/login"} className="text-white font-pally-medium">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignupAuth;
