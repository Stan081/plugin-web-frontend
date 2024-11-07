"use client";

import React, { useCallback, useMemo, useState } from "react";
import { FiWatch } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  RecurringForm,
  RecurringFormShema,
} from "@/models/create-event-schema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timezone } from "@/static-datas/create-event";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { RecurringEvent } from "@/pages/api/mutate/create-events/eventTypeAPI";
import Spinner from "@/tw-components/spinner";
import { useToast } from "@/components/ui/use-toast";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useGetEvent } from "@/hooks/events/useGetEvent";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";

interface RecurringFormComponentProps {
  eventType: string;
}

const schedules: { id: string; name: string }[] = [
  {
    id: "1",
    name: "Daily",
  },
  {
    id: "2",
    name: "Monday-Friday",
  },
  {
    id: "3",
    name: "Weekends",
  },
  {
    id: "4",
    name: "Weekly",
  },
  {
    id: "5",
    name: "Monthly",
  },
  {
    id: "6",
    name: "Yearly",
  },
];

const RecurringFormComponent: React.FC<RecurringFormComponentProps> = ({
  eventType,
}) => {
  const { nextStep: next, previousStep: previous } = useCreateEventContext();
  const { data: event, isLoading: loading } = useGetEvent();
  const [alert, setAlert] = useState<boolean>(true);
  const [recurringSchedule, setRecurringSchedule] = useState<string>("1");

  const form = useForm<RecurringForm>({
    mode: "all",
    defaultValues: {
      schedule:
        event?.data?.recurringEvent?.scheduleReference || recurringSchedule,
      start_date: new Date(event?.data?.recurringEvent?.startDate) || null,
      start_time: event?.data?.recurringEvent?.startTime ?? "",
      end_date: new Date(event?.data?.recurringEvent?.endDate) || null,
      end_time: event?.data?.recurringEvent?.endTime ?? "",
      timezone: event?.data?.recurringEvent?.timeZone ?? "",
    },
    resolver: yupResolver(RecurringFormShema),
  });

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => RecurringEvent(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Uploaded Successfully",
          description: `${response?.message}`,
        });
        next();
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    },
  });

  const onSubmit = useCallback((payload: RecurringForm) => {
    const getSchedule = schedules.find((item) => item.id === recurringSchedule);
    const data = {
      eventType,
      recurringEvent: {
        scheduleReference: getSchedule?.name,
        startDate: payload?.start_date,
        startTime: payload?.end_time,
        timeZone: payload?.timezone,
        endTime: payload?.end_time,
        endDate: payload?.end_date,
      },
    };
    mutate(data);
  }, []);

  return (
    <div className="">
      {loading && <SpinnerOverlay/>}
      <div className="flex flex-wrap gap-3.5 my-5 text-white">
        {schedules.map((type) => (
          <button
            key={type.id}
            onClick={() => setRecurringSchedule(type.id)}
            className={`py-2 px-4 rounded-full border text-sm ${
              recurringSchedule === type.id
                ? "bg-white text-black"
                : "border-white"
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>

      {alert && (
        <div className="my-5 flex justify-between items-center bg-[#FFF1F0] rounded-lg p-1.5">
          <div className="flex items-center gap-3">
            <FiWatch color="#D9302A" size={18} />
            <p className="text-[#101928] font-pally-regular text-sm">
              Start-time and End-time will be recorded and displayed in minutes{" "}
            </p>
          </div>
          <div className="cursor-pointer" onClick={() => setAlert(false)}>
            <MdOutlineClose size={20} color="#000" />
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 w-full h-full"
        >
          <div className="flex flex-col justify-between h-[60vh] md:h-[33vh] whitespace-normal overflow-y-auto">
            <div className="grid grid-cols-2 gap-5 h-auto w-auto">
              <FormItem>
                <FormLabel className="text-white" htmlFor="start_date">
                  Start Date
                </FormLabel>
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => {
                    const formattedDate =
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : field.value;

                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="DD/MM/YY"
                            type="date"
                            id="start_date"
                            className=" bg-white text-black font-pally-regular"
                            {...field}
                            value={formattedDate}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FormItem>
              <FormItem>
                <FormLabel className="text-white" htmlFor="start_time">
                  Start Time
                </FormLabel>
                <FormField
                  control={form.control}
                  name="start_time"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="0:00"
                            type="time"
                            id="start_time"
                            className="bg-white text-black font-pally-regular"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FormItem>
              <FormItem>
                <FormLabel className="text-white" htmlFor="end_date">
                  End Date
                </FormLabel>
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => {
                    const formattedDate =
                      field.value instanceof Date
                        ? field.value.toISOString().split("T")[0]
                        : field.value;

                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="DD/MM/YY"
                            type="date"
                            id="end_date"
                            className=" bg-white text-black font-pally-regular"
                            {...field}
                            value={formattedDate}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FormItem>
              <FormItem>
                <FormLabel className="text-white" htmlFor="end_time">
                  End Time
                </FormLabel>
                <FormField
                  control={form.control}
                  name="end_time"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="0:00"
                            type="time"
                            id="end_time"
                            className="bg-white text-black font-pally-regular"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FormItem>
              <FormItem className="col-span-2">
                <FormLabel>Timezone</FormLabel>
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => {
                    return (
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={String(field.value)}
                        >
                          <SelectTrigger className="border h-10 py-1 flex justify-between bg-white text-black items-center gap-2 rounded-md p-2 w-full">
                            <SelectValue placeholder="select timezone" />
                          </SelectTrigger>
                          <SelectContent className="w-full border z-50 bg-primary-foreground rounded-sm bg-white">
                            {timezone.map((zone, index) => {
                              return (
                                <SelectItem key={index} value={zone}>
                                  <div className="flex items-center gap-2">
                                    {zone}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    );
                  }}
                />

                <FormMessage />
              </FormItem>
            </div>
          </div>
          <div className="sticky z-30 bottom-0 bg-[#281E17]">
            <Separator />
            <div className="py-5 flex justify-between items-center">
              <Button
                onClick={() => {}}
                variant="outline"
                className="text-white border-white hover:bg-[#6c5442]"
              >
                Save Progress
              </Button>

              <div className="flex items-center gap-8">
                <Button
                  onClick={previous}
                  className="cursor-pointer hover:outline hover:outline-white/50 p-2 rounded-lg"
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  disabled={isPending}
                  variant="destructive"
                >
                  {isPending ? <Spinner /> : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RecurringFormComponent;
