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

import Spinner from "@/tw-components/spinner";
import { CheckinAgentForm, CheckinAgentSchema } from "@/models/checkin-agent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { IoCloseOutline } from "react-icons/io5";
import { useGetOrganiserEventTickets } from "@/hooks/organiser/useGetEventTickets";
import { useEventsContext } from "@/providers/events.provider";
import { RiCloseFill } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { CreateTicketAgent } from "@/pages/api/mutate/organiser/ticketAgentApi";
import { useGetTicketAgents } from "@/hooks/organiser/useGetTicketAgents";
import { useDeleteTicketAgent } from "@/hooks/organiser/useDeleteTicketAgent";
import { Skeleton } from "@/components/ui/skeleton";

const EventTicketAgents = () => {
  const [selectedCategories, setSelectedCategories] = useState<
    { ticketName: string; id: string }[]
  >([]);
  const { publishedEventId } = useEventsContext();
  const { data: ticketAgents, isLoading: isTicketAgentsLoading } =
    useGetTicketAgents(publishedEventId);
  const { data: eventTickets } = useGetOrganiserEventTickets(publishedEventId);
  const { mutate: deleteTicketAgent, isPending: isDeleteTicketAgentPending } =
    useDeleteTicketAgent();
  const form = useForm<CheckinAgentForm>({
    mode: "all",
    defaultValues: {
      agent_email: "",
      agent_ticket_type: [] as { ticketName: string; id: string }[],
    },
    resolver: yupResolver(CheckinAgentSchema),
  });

  const client = useQueryClient();

  const handleCategoryChange = (category: string) => {
    const ticket = eventTickets?.data?.find((t) => t.id === category);
    if (ticket) {
      setSelectedCategories((prevSelected) => {
        const exists = prevSelected.some((item) => item.id === category);
        if (exists) {
          return prevSelected.filter((item) => item.id !== category);
        }
        return [
          ...prevSelected,
          { ticketName: ticket.ticketName, id: ticket.id },
        ];
      });
    }
  };

  const handleDeleteSelected = (categoryId: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.filter((category) => category.id !== categoryId)
    );
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => CreateTicketAgent(data),
    onSuccess: (response) => {
      if (response?.data) {
        toast({
          variant: "success",
          title: "Your ticket agent has been created",
          description: `${response?.message}`,
        });
        client.invalidateQueries({ queryKey: ["allTicketAgents"] });
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Failed to create ticket agent",
        description: error?.message,
      });
    },
  });

  const onSubmit = (payload: CheckinAgentForm) => {
    const data = {
      event: publishedEventId,
      email: payload.agent_email,
      tickets: selectedCategories.map((item) => ({ticketId:item.id, ticketName: item.ticketName})),
    };
    mutate(data);
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
                  {eventTickets?.data?.map((category) => (
                    <SelectItem key={category?.id} value={category?.id}>
                      <div className="flex items-center gap-2">
                        {category?.ticketName}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-3">
                {selectedCategories.length > 0 &&
                  selectedCategories.map((cat) => (
                    <p
                      key={cat.id}
                      className="flex border border-gray-400 rounded py-0.5 px-1.5 items-center gap-2 text-sm text-gray-600"
                    >
                      {cat.ticketName}
                      <span
                        onClick={() => handleDeleteSelected(cat.id)}
                        className="cursor-pointer text-red-500"
                      >
                        <RiCloseFill size={16} />
                      </span>
                    </p>
                  ))}
              </div>

              <Button
                variant="destructive"
                type="submit"
                className="w-full mt-5"
                disabled={isPending}
              >
                {isPending ? <Spinner /> : "Add Agent"}
              </Button>
            </div>
          </form>
        </Form>

        <Separator />

        {ticketAgents?.data?.length === 0 ? (
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
              {ticketAgents?.data?.map((ticketAgent) => (
                <Fragment key={ticketAgent?._id}>
                  {isTicketAgentsLoading ? (
                    <Skeleton className="w-full h-12" />
                  ) : (
                    <li className="flex justify-between items-center">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#34C759] w-8 h-8 flex justify-center items-center rounded-full p-2">
                          <p className="font-pally-regular uppercase text-white text-lg">
                            {ticketAgent?.email?.charAt(0).toUpperCase()}
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <p className="font-pally-regular base">
                            {ticketAgent?.email}
                          </p>
                          <p className="flex gap-2">
                            {ticketAgent?.tickets?.map((ticket) => (
                              <span
                                key={ticket.ticketName}
                                className="bg-[#98A2B329]/10 px-3 py-1.5 font-pally-regular text-sm lg:text-base"
                              >
                                {ticket.ticketName}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                      {isDeleteTicketAgentPending ? (
                        <Spinner />
                      ) : (
                        <div
                          onClick={() =>
                            deleteTicketAgent({ agentId: ticketAgent?._id })
                          }
                          className="cursor-pointer"
                        >
                          <IoCloseOutline size={24} className="text-red-500" />
                        </div>
                      )}
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default EventTicketAgents;
