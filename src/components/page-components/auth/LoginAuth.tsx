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
import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spinner from "@/tw-components/spinner";
import { useRouter } from "next/navigation";


const LoginAuth = () => {
  const form = useForm<LoginFields>({
    mode: "all",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(LoginSchema),
  });

//  initialise router
const router = useRouter()

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  const onSubmit = useCallback(async (payload: LoginFields) => {
    console.log(payload);
    router.push('/verify')
  }, []);
  return (
    <div>
      <Form {...form}>
        <form
          onClick={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 my-5"
        >
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
          <Button
            disabled={isLoading}
            variant="destructive"
            type="submit"
            className="mt-8"
          >
            {isLoading ? <Spinner /> : "Login"}
          </Button>
        </form>
      </Form>
      <div className="flex gap-2 mt-10">
        <p className="text-[#98A2B3] font-pally-regular">
        Don't have an account?
        </p>
        <Link href={"/signin"} className="text-white font-pally-medium">
        Create account
        </Link>
      </div>
    </div>
  );
};

export default LoginAuth;
