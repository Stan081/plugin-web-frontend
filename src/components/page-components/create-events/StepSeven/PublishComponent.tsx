"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import InviteeInfo from "./InviteeInfo";
import { Textarea } from "@/components/ui/textarea";
import { PiInfoBold } from "react-icons/pi";
import { useCreateEventContext } from "@/providers/create_event.provider";
import InviteeCard from "./InviteeCard";
import CongratulationModal from "./CongratulationModal";

const PublishComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [organiserImage, setOrganiserImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedVisibility, setSelectedVisibility] =
    useState<string>("public");
  const [checkSchedule, setCheckSchedule] = useState<string>("now");

  const form = useForm<PublishForm>({
    mode: "all",
    defaultValues: {
      organiser_photo: "",
      organiser_name: "",
      event_visibility: selectedVisibility,
      PublishWhen: checkSchedule,
      schedulePublish: {
        start_date: new Date(),
        start_time: "",
      },
    },
    resolver: yupResolver(PublishFormSchema),
  });

  useEffect(() => {
    form.setValue("event_visibility", selectedVisibility);
  }, [selectedVisibility, form.setValue]);

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  // Handle image upload for banner
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrganiserImage(reader.result as string);
        form.setValue("organiser_photo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image delete for organiser photo
  const handleImageDelete = () => {
    setOrganiserImage(null);
    form.setValue("organiser_photo", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle edit for organiser photo
  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = useCallback(async (payload: PublishForm) => {
    console.log(payload);
  }, []);

  return (
    <div>
      {showModal && <CongratulationModal open={showModal}/>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 w-full h-full"
        >
          <div className="h-[74vh] whitespace-normal overflow-y-auto space-y-5">
            <div className="mt-5 flex items-start gap-3">
              <FormItem className="w-32 space-y-3">
                <FormField
                  control={form.control}
                  name="organiser_photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="organiserImage-uploader">
                          {organiserImage ? (
                            <div>
                              <div className="relative h-20 w-20 bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden rounded-full border-4">
                                <img
                                  src={organiserImage}
                                  alt="Uploaded"
                                  className="w-auto h-auto pointer-events-none object-cover"
                                />
                              </div>

                              <div className="text-center text-white mt-4 flex gap-5">
                                <button
                                  type="button"
                                  onClick={handleEditClick}
                                  className="outline outline-white/50 p-1.5 rounded-md bg-white"
                                >
                                  <FiEdit size={18} color="#000" />
                                </button>
                                <button
                                  type="button"
                                  onClick={handleImageDelete}
                                  className="outline outline-white/50 p-1.5 rounded-md bg-white"
                                >
                                  <HiOutlineTrash size={18} color="#000" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="py-9 bg-white/10 cursor-pointer rounded-full w-20 h-20">
                              <label htmlFor="file-input">
                                <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                                  <p className="font-pally-regular text-[#F58B86] underline text-xs">
                                    Upload Photo
                                  </p>
                                </div>
                              </label>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={(e) => {
                          field.ref(e);
                          fileInputRef.current = e; // Set the ref
                        }}
                        style={{ display: "none" }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel className="text-white mt-4 block">
                  Organiser photo
                </FormLabel>
              </FormItem>
              <FormItem className="w-full max-w-3xl">
                <FormLabel className="text-white" htmlFor="organiser_name">
                  Organiser Name
                </FormLabel>
                <FormField
                  control={form.control}
                  name="organiser_name"
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
            </div>

            <FormItem>
              <FormField
                control={form.control}
                name="event_visibility"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg ">
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

            {/* {selectedVisibility === "private" && (
            <FormItem className="w-full px-4">
              <FormLabel className="text-white" htmlFor="message">
                Invite message
              </FormLabel>
              <FormField
                control={form.control}
                name="inviteesMessage.message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a brief message you want your  invitees to see when"
                        id="message"
                        disabled={isLoading}
                        className="w-full bg-white text-black font-pally-regular h-32 md:h-56"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-2 flex items-center gap-3 bg-[#F4E1C4] text-[#3D2E21] p-2 rounded text-sm">
                <span>
                  <PiInfoBold size={16} />
                </span>
                <p className="font-pally-regular">
                  This message would be sent to invitees added to this event.
                </p>
              </div>
            </FormItem>
          )}

          {selectedVisibility === "private" && (
            <div>
              {inviteeState.length !== 0 &&
                inviteeState.map((invitee, index) => (
                  <InviteeCard key={index} {...invitee} />
                ))}
              <InviteeInfo />
            </div>
          )} */}

            <FormItem>
              <FormField
                control={form.control}
                name="PublishWhen"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg ">
                      When should we publish your event?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          setCheckSchedule(value);
                        }}
                        defaultValue={checkSchedule}
                        className="space-y-3"
                      >
                        <FormItem className=" space-y-1 flex items-center space-x-3">
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

            {checkSchedule === "later" && (
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
                              disabled={isLoading}
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
                              disabled={isLoading}
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
                  // onClick={previous}
                  className="cursor-pointer hover:outline hover:outline-white/50 p-2 rounded-lg"
                >
                  Back
                </Button>

                <Button type="submit" variant="destructive">
                  Publish Event
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PublishComponent;
