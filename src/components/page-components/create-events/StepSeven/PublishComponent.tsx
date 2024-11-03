"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PublishForm, PublishFormSchema } from "@/models/create-event-schema";
import { HiOutlineTrash } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CongratulationModal from "./CongratulationModal";
import { uploadImage } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useMutation } from "@tanstack/react-query";
import { EventPublish } from "@/pages/api/mutate/create-events/EventPublish";
import Spinner from "@/tw-components/spinner";
import { useMe } from "@/pages/api/query/me";
import ProfileFormModal from "../../organisers/organiser-dashboard/organiser-settings/ProfileFormModal";

const PublishComponent = () => {
  const { data: userData } = useMe();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showProfileForm, setShowProfileForm] = useState<boolean>(false);
  const [selectedVisibility, setSelectedVisibility] =
    useState<string>("public");
  const [checkSchedule, setCheckSchedule] = useState<string>("now");
  const form = useForm<PublishForm>({
    mode: "all",
    defaultValues: {
      event_visibility: selectedVisibility,
      publishWhen: true,
      schedulePublish: {
        start_date: new Date(),
        start_time: "",
      },
    },
    resolver: yupResolver(PublishFormSchema),
  });

  const publishWhen = form.watch("publishWhen");

  useEffect(() => {
    form.setValue("event_visibility", selectedVisibility);
  }, [selectedVisibility, form.setValue]);

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EventPublish(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: publishWhen
            ? "Event has been published"
            : "Event has been schedule",
          description: `${response?.message}`,
        });
        setShowModal(!showModal);
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

  const onSubmit = useCallback(async (payload: PublishForm) => {
    const data = {
      isVisible: true,
      publishStatus: payload.publishWhen ? "yes" : "no",
      eventSchedule: {
        startDate: payload.schedulePublish.start_date,
        startTime: payload.schedulePublish.start_time,
      },
    };
    console.log(userData?.data?.isOrganizer)
    if (!userData?.data?.isOrganizer) {
      return setShowProfileForm(!showProfileForm);
    }
    mutate(data);
  }, []);

  return (
    <div>
      {showModal && (
        <CongratulationModal
          open={showModal}
          close={() => setShowModal(!showModal)}
        />
      )}

      {showProfileForm && (
        <ProfileFormModal
          open={showProfileForm}
          close={() => setShowProfileForm(!showProfileForm)}
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 w-full h-full"
        >
          <div className="h-[74vh] whitespace-normal overflow-y-auto space-y-5">
            <FormItem>
              <FormField
                control={form.control}
                name="event_visibility"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-xl ">
                      Who can see your event?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedVisibility(value);
                        }}
                        defaultValue={selectedVisibility}
                        className="space-y-3"
                      >
                        <FormItem className=" space-y-1">
                          <div className="flex items-center space-x-3">
                            <FormControl>
                              <RadioGroupItem value="public" />
                            </FormControl>
                            <FormLabel className="font-pally-regular text-base">
                              Public
                            </FormLabel>
                          </div>
                          <p className="text-white font-pally-regular text-sm">
                            Shared on Eventdey and search engines
                          </p>
                        </FormItem>
                        <FormItem className="space-y-1">
                          <div className="flex items-center space-x-3">
                            <FormControl>
                              <RadioGroupItem value="private" />
                            </FormControl>
                            <FormLabel className="font-pally-regular text-base">
                              Private
                            </FormLabel>
                          </div>
                          <p className="text-white font-pally-regular text-sm">
                            Only available to a selected audience
                          </p>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>

            <FormItem>
              <FormField
                control={form.control}
                name="publishWhen"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-xl">
                      When should we publish your event?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          setCheckSchedule(value);
                          field.onChange(value === "now"); // Converts to boolean when updating field value
                        }}
                        defaultValue={checkSchedule}
                        className="space-y-3"
                      >
                        <FormItem className="space-y-1 flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="now" />
                          </FormControl>
                          <FormLabel className="font-pally-regular text-base">
                            Publish Now
                          </FormLabel>
                        </FormItem>
                        <FormItem className="space-y-1 flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="later" />
                          </FormControl>
                          <FormLabel className="font-pally-regular text-base">
                            Schedule later
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>

            {!publishWhen && (
              <div className="flex items-start gap-4">
                <FormItem className="w-full">
                  <FormLabel className="text-white" htmlFor="start_date">
                    Sales starts on
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="schedulePublish.start_date"
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
                <FormItem className="w-full">
                  <FormLabel className="text-white" htmlFor="start_time">
                    Sales start time
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="schedulePublish.start_time"
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
              </div>
            )}
          </div>

          <div className="sdsticky bottom-0 bg-[#281E17]">
            <Separator />

            <div className=" py-5 flex items-center justify-end gap-8">
              <Button
                // onClick={previous}
                className="cursor-pointer hover:outline hover:outline-white/50 p-2 rounded-lg"
              >
                Back
              </Button>

              <Button type="submit" disabled={isPending} variant="destructive">
                {isPending ? <Spinner /> : "Publish Event"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PublishComponent;
