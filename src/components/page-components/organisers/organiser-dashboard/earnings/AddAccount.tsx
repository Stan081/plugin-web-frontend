import React, { FC, useCallback, useMemo } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseLine } from "react-icons/ri";
import { BankAccountForm, BankAccountSchema } from "@/models/organiser-schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AddAccountProps {
  open: boolean;
  close: () => void;
}

const AddAccount: FC<AddAccountProps> = ({ close, open }) => {
  const form = useForm<BankAccountForm>({
    mode: "all",
    defaultValues: {
      bank_name: "",
      account_number: null,
      account_name: "",
    },
    resolver: yupResolver(BankAccountSchema),
  });

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  const onSubmit = useCallback(async (payload: BankAccountForm) => {
    console.log(payload);
  }, []);
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium flex justify-between items-start"
            >
              <div className="">
                <p className=" font-pally-medium text-2xl">
                  Add Payout Information
                </p>
                <p className=" font-pally-regular text-sm md:text-base text-[#586170]">
                  Add Payout Information
                </p>
              </div>

              <div onClick={close} className="p-1.5 rounded-full bg-gray-200">
                <RiCloseLine size={20} />
              </div>
            </DialogTitle>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 flex flex-col justify-between gap-4 w-full h-full"
                >
                  <FormItem className="w-full">
                    <FormLabel className="" htmlFor="bank_name">
                      Bank Name
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="bank_name"
                      render={({ field }) => (
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            defaultValue={String(field.value)}
                          >
                            <SelectTrigger className="border h-10 py-1 flex justify-between bg-white text-black items-center gap-2 rounded-md p-2 w-full">
                              <SelectValue placeholder="select timezone" />
                            </SelectTrigger>
                            <SelectContent className="w-full border z-40 bg-primary-foreground rounded-sm bg-white">
                              {["opay", "palmpay"].map((bank, index) => {
                                return (
                                  <SelectItem key={index} value={bank}>
                                    <div className="flex items-center gap-2">
                                      {bank}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </FormItem>
                  <FormItem className="w-full">
                    <FormLabel className="" htmlFor="account_number">
                      Account Number
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="account_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter account number"
                              type="number"
                              id="account_number"
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

                  <Button disabled={!form.getFieldState} variant="destructive" type="submit">
                    Add Bank Account
                  </Button>
                </form>
              </Form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddAccount;
