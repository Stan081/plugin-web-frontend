"use client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFields, LoginSchema } from "@/models/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spinner from "@/tw-components/spinner";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/pages/api/mutate/Login";
import { useToast } from "@/components/ui/use-toast";
import { LoginFieldType } from "@/lib/types/AuthType";
import { setCookie } from "@/lib/cookies";

const LoginAuth = () => {
  const form = useForm<LoginFields>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(LoginSchema),
  });

  // Initialise router
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFieldType) => login(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Verify OTP",
          description: `${response?.message}`,
        });
        router.push("/verify-login");
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error?.message || 
        'Newtwork issue',
      });
    },
  });

  const onSubmit = (payload: LoginFields) => {
    setCookie("email", payload.email);
    console.log(payload);
    const data = {
      email: payload.email,
    };
    mutate(data);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 my-5"
        >
          <FormItem className="w-full">
            <FormLabel className="text-white" htmlFor="email_address">
              Email address
            </FormLabel>
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
                      className="w-full bg-white text-black font-pally-regular"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormItem>
          <Button
            disabled={isPending}
            variant="destructive"
            type="submit"
            className="mt-3"
          >
            {isPending ? <Spinner /> : "Login"}
          </Button>
        </form>
      </Form>
      <div className="flex gap-2 mt-10">
        <p className="text-[#98A2B3] font-pally-regular">
          Don't have an account?
        </p>
        <Link href={"/signup"} className="text-white font-pally-medium">
          Create account
        </Link>
      </div>
    </div>
  );
};

export default LoginAuth;
