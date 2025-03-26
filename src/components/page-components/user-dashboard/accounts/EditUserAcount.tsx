import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { FC, useCallback } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiCloseLine } from "react-icons/ri";
import Spinner from "@/tw-components/spinner";
import { useMe } from "@/pages/api/query/me";
import { PhoneNumberInput } from "@/components/PhoneNumberInput";
import { EditUser } from "@/pages/api/mutate/EditUserAccount";
import { EditUserType } from "@/lib/types/AuthType";

const UserSchema = yup.object().shape({
  firstname: yup.string().optional(),
  lastname: yup.string().optional(),
  email: yup.string().email("Invalid email address").optional(),
  phone: yup.string().optional(),
  address: yup.string().optional(),
});

type User = yup.InferType<typeof UserSchema>;

const EditUserAcount: FC<{ open: boolean; close: () => void }> = ({
  open,
  close,
}) => {
  const { data: user } = useMe();
  const form = useForm<User>({
    mode: "all",
    defaultValues: {
      firstname: user?.data?.name?.firstname ?? "",
      lastname: user?.data?.name?.lastname ?? "",
      email: user?.data?.email ?? "",
      phone: user?.data?.contact?.phone ?? "",
      address: user?.data?.contact?.country ?? "",
    },
    resolver: yupResolver(UserSchema),
  });

  const { toast } = useToast();

  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: EditUserType) => EditUser(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Your account has been updated",
          description: `${response?.message}`,
        });
        client.invalidateQueries({ queryKey: ["me"] });
        close();
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Couldn't edit your account",
      });
    },
  });

  const onSubmit = (payload: User) => {
    // console.log(payload);

    const data = {
      name: {
        firstname: payload?.firstname,
        lastname: payload?.lastname,
      },
      email: payload?.email,
      contact: {
        phone: payload?.phone,
        country: payload?.address,
      },
    };

    mutate(data);
  };

  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        {/* {isUploading && <SpinnerOverlay />} */}
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-[#FDE5E3] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium flex justify-between items-start"
            >
              <h3 className="font-pally-medium text-[#281E17] text-xl">
                Edit Personal Information
              </h3>
              <div
                onClick={close}
                className="p-1.5 rounded-full bg-gray-600 cursor-pointer"
              >
                <RiCloseLine size={20} color="#fff" />
              </div>
            </DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-5 z-50"
              >
                <div className="flex gap-4">
                  <FormItem className="w-full">
                    <FormLabel className="text-[#667185]" htmlFor="firstname">
                      First Name
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter first name"
                              type="text"
                              id="firstname"
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
                    <FormLabel className="text-[#667185]" htmlFor="lastname">
                      Last Name
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter your lastname"
                              type="text"
                              id="lastname"
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
                  <FormLabel className="text-[#667185]" htmlFor="user-email">
                    Email Address
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter your email address"
                            type="email"
                            id="user-email"
                            autoFocus
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-3">
                        <FormLabel className="text-[#667185]">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <PhoneNumberInput
                            {...field}
                            placeholder="Phone Number"
                            defaultCountry="NG"
                            disabled={isPending}
                            id="phone_number"
                            type="text"
                            aria-disabled={isPending}
                            style={{ outline: "none", border: "none" }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormItem>

                <FormItem className="w-full">
                  <FormLabel className="text-[#667185]" htmlFor="user-address">
                    Address
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter your address"
                            type="text"
                            id="user-address"
                            autoFocus
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
                  type="submit"
                  className="w-full"
                  variant="destructive"
                  disabled={isPending}
                >
                  {isPending ? <Spinner /> : `Save edit`}
                </Button>
              </form>
            </Form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default EditUserAcount;
