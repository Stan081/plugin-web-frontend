import { PhoneNumberInput } from "@/components/PhoneNumberInput";
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
import { Label } from "@/components/ui/label";
import {
  InviteeListForm,
  InviteeListSchema,
} from "@/models/create-event-schema";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

interface InviteeInfoProps {
  //   setSelectedVisibility: (key: string) => void;
}

const InviteeInfo: FC<InviteeInfoProps> = ({}) => {
  const { handleCreateInvitee } = useCreateEventContext();
  const [ticketPasscode, setTicketPasscode] = useState<string>();
  const form = useForm<InviteeListForm>({
    mode: "all",
    defaultValues: {
      full_name: "",
      phone_number: "",
      pass_code: null,
    },
    resolver: yupResolver(InviteeListSchema),
  });

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  // Function to generate passcode
  const generatePasscode = () => {
    const passcode = Math.floor(10000 + Math.random() * 90000);
    setTicketPasscode(passcode.toString());
  };

  const onSubmit = useCallback(async (payload: InviteeListForm) => {
    console.log(payload);
    handleCreateInvitee({
      fullName: payload.full_name,
      phoneNumber: payload.phone_number,
      passcode: payload.pass_code,
    });
  }, []);

  return (
    <div className="mx-4">
      <div className="border w-full border-gray-600 my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 w-full h-full"
        >
          <FormItem className="w-full max-w-3xl">
            <FormLabel className="text-white" htmlFor="organiser_name">
              Organiser Name
            </FormLabel>
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Organizer name"
                      type="text"
                      id="organiser_name"
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
                      className="border text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormItem>

          <div className="w-full max-w-3xl">
            <Label className="text-white" htmlFor="passcode">
              Ticket pass code
            </Label>
            <div className="bg-white p-2 h-10 rounded-md w-full flex justify-between">
              <p className="font-pally-regular text-black">
                {ticketPasscode ? ticketPasscode : "___ ___ ___"}
              </p>
              <p
                onClick={generatePasscode}
                className="font-pally-regular cursor-pointer text-blue-700"
              >
                Generate Passcode
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              variant="destructive"
              type="submit"
              className="w-full max-w-sm"
            >
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InviteeInfo;
