"use client";
import React, { Fragment, useCallback, useState } from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/tw-components/spinner";
import { CheckinAgentForm, CheckinAgentSchema } from "@/models/checkin-agent";
import { Input } from "@/components/ui/input";
import { useGetOrganiserEvents } from "@/hooks/organiser/userGetOrganiserEvents";
import { useMe } from "@/pages/api/query/me";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { IoCloseOutline } from "react-icons/io5";

const EventTicketAgents = () => {
  const [selectedCategories, setSelectedCategories] = useState<string>("");


  const form = useForm<CheckinAgentForm>({
    mode: "all",
    defaultValues: {
      agent_email: "",
      agent_ticket_type: selectedCategories,
    },
    resolver: yupResolver(CheckinAgentSchema),
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(category);
  };

  const onSubmit = (payload: CheckinAgentForm) => {
    console.log(payload);
  };

  return (
    <Fragment>
      <h1 className="font-pally-medium text-lg lg:text-2xl">
        Check-in Agents{" "}
      </h1>
      <p className="font-pally-regular mt-3">
        Add Check-in agents to your event to manage specific ticket check-in{" "}
      </p>

      <div className="p-4 rounded-lg border mt-6 space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <p className="font-pally-medium text-base lg:text-lg">Add agents</p>
            <div className="flex flex-col gap-5">
              <FormItem className="w-full">
                <FormLabel className="text-white" htmlFor="email_address">
                  Email address
                </FormLabel>
                <FormField
                  control={form.control}
                  name="agent_email"
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
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger className="border h-10 py-1 flex justify-between bg-white text-black items-center gap-2 rounded-md p-2 w-full">
                  <SelectValue placeholder="Choose ticket type for agent" />
                </SelectTrigger>
                <SelectContent className="w-full border z-40 bg-primary-foreground rounded-sm bg-white">
                  {["members", "vip", "officials"].map((category, index) => (
                    <SelectItem key={index} value={category}>
                      <div className="flex items-center gap-2">{category}</div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="destructive"
                type="submit"
                className="w-full mt-5"
              >
                {false ? <Spinner /> : "Add Agent"}
              </Button>
            </div>
          </form>
        </Form>

        <Separator />

        {false ? (
          <div className="flex flex-col items-center gap-5">
            <Image
              src={
                "https://res.cloudinary.com/dbhbyikta/image/upload/v1741252592/Team_solving_a_puzzle_together_pxzxhk.svg"
              }
              width={157}
              height={126}
              alt="empty state"
              className="pointer-events-none"
            />

            <p className="text-[#969CA5] font-pally-regular">
              You do not have any Agents for this event.
            </p>
          </div>
        ) : (
          <div className="mt-5">
            <p className="font-pally-regular text-lg">Ticket agents</p>
            <ul className="mt-5 space-y-2.5">
              <li className="flex justify-between items-center">
                <div className="flex items-start gap-4">
                  <div className="bg-[#34C759] w-8 h-8 flex justify-center items-center rounded-full p-2">
                    <p className="font-pally-regular uppercase text-white text-lg">
                      T
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-pally-regular base">email@gmail.com</p>
                    <p className="bg-[#98A2B329]/10 px-3 py-1.5 font-pally-regular text-sm lg:text-base">
                      Member
                    </p>
                  </div>
                </div>
                <div className="cursor-pointer">
                  <IoCloseOutline size={24} className="text-red-500" />
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default EventTicketAgents;
