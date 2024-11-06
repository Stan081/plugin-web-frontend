"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";
import { StepsProps } from "@/pages/create-event";
import { Button } from "@/components/ui/button";
import { IoMdImages } from "react-icons/io";
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
import { EventStepOne, EventStepOneSchema } from "@/models/create-event-schema";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { HiOutlineTrash } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { Textarea } from "@/components/ui/textarea";
import { uploadImage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { EventBasicInfo } from "@/pages/api/mutate/create-events/eventBasicInfo";
import { useToast } from "@/components/ui/use-toast";
import { getCookie, removeCookie, setCookie } from "@/lib/cookies";
import Spinner from "@/tw-components/spinner";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useMe } from "@/pages/api/query/me";
import { useEditProfileRole } from "@/hooks/useEditProfileRole";
import { useGetEventById } from "@/hooks/events/useGetEventById";

const pageContents = [
  "Make your event name short and memorable.",
  "Focus on unique aspects to make your description engaging.",
];

const StepOne: React.FC<StepsProps> = ({ next, previous }) => {
  const {data:eventId} = useGetEventById()
  const { data: userData } = useMe();
  const [imageBanner, setImageBanner] = useState<string | null>(null);
  const [imageThumbnail, setImageThumbnail] = useState<string | null>(null);
  const fileInputRefBanner = useRef<HTMLInputElement | null>(null);
  const fileInputRefThumbnail = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const form = useForm<EventStepOne>({
    mode: "all",
    defaultValues: {
      event_banner: eventId?.data?.eventBanner ?? "",
      event_thumbnail: eventId?.data?.thumbnail ?? "",
      event_name: eventId?.data?.eventName ?? "",
      event_description: eventId?.data?.eventDescription ?? "",
    },
    resolver: yupResolver(EventStepOneSchema),
  });


  const { toast } = useToast();

  // Handle image upload for banner
  const handleImageUploadBanner = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setIsUploading(true); // Start spinner

      try {
        const uploadResult = await uploadImage(file);

        const imageUrl = uploadResult.secure_url;

        setImageBanner(imageUrl);
        form.setValue("event_banner", imageUrl);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error in uploading image",
          description: error?.message,
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Handle image delete for image banner
  const handleImageDeleteBanner = () => {
    setImageBanner(null);
    form.setValue("event_banner", "");
    if (fileInputRefBanner.current) {
      fileInputRefBanner.current.value = "";
    }
  };

  // Handle edit for banner
  const handleEditClickBanner = () => {
    if (fileInputRefBanner.current) {
      fileInputRefBanner.current.click();
    }
  };

  // Handle image upload for thumbnail
  const handleImageUploadThumbnail = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setIsUploading(true); // Start spinner

      try {
        const uploadResult = await uploadImage(file);

        const imageUrl = uploadResult.secure_url;

        setImageThumbnail(imageUrl);
        form.setValue("event_thumbnail", imageUrl);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error in uploading image",
          description: error?.message,
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Handle image delete for image thumbnail
  const handleImageDeleteThumbnail = () => {
    setImageThumbnail(null);
    form.setValue("event_thumbnail", "");
    if (fileInputRefThumbnail.current) {
      fileInputRefThumbnail.current.value = "";
    }
  };

  // Handle edit for thumbnail
  const handleEditClickthumbnail = () => {
    if (fileInputRefThumbnail.current) {
      fileInputRefThumbnail.current.click();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EventBasicInfo(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "File has been uploaded",
          description: `${response?.message}`,
        });
        next();
        // Set the cookie here
        setCookie("event_id", response?.data?._id);
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

  const { mutate: mutateRole, isPending: isPendingRole } = useEditProfileRole();

  const onSubmit = useCallback(
    (payload: EventStepOne) => {
      const data = {
        userId: userData?.data?._id,
        eventBanner: payload?.event_banner,
        thumbnail: payload?.event_thumbnail,
        eventName: payload?.event_name,
        eventDescription: payload?.event_description,
      };

      if (userData?.data?.role === "user") {
        const data = { role: "organizer" };
        mutateRole(data);
      }

      // Ensure `event_id` is removed before setting a new one
      if (getCookie("event_id")) {
        removeCookie("event_id");
      }
      if (isPendingRole) {
        <SpinnerOverlay />;
      } else {
        mutate(data);
        // console.log(data)
      }
    },
    [mutateRole, userData]
  );

  return (
    <div
      className="flex flex-col lg:flex-row items-start gap-4 lg:gap-12
    "
    >
      <div className="w-full lg:w-2/5 px-4 lg:px-0">
        <Intro contents={pageContents} title="Tell us about your event" />
      </div>
      {isUploading && <SpinnerOverlay />}
      <div className="w-full h-full lg:w-3/5">
        <FormContainer formTitle="Basic Information" currPosition={[40, 0, 0]}>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-between gap-4 w-full h-full mb-6 px-3"
              >
                <div className="lg:h-[70vh] whitespace-normal overflow-y-auto">
                  <FormItem className="w-full">
                    <FormLabel className="text-white font-pally-medium">
                      Event Banner
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="event_banner"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="imageBanner-uploader">
                              {imageBanner ? (
                                <div className="relative">
                                  <div className="relative h-[20vh] bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden">
                                    <img
                                      src={imageBanner}
                                      alt="Uploaded"
                                      className="w-auto"
                                    />
                                  </div>
                                  <div className="absolute inset-0 bg-black opacity-50"></div>

                                  <div className="absolute right-5 top-0 z-10 text-center text-white p-4 flex gap-5">
                                    <button
                                      type="button"
                                      onClick={handleEditClickBanner}
                                      className="outline outline-white/50 p-1.5 rounded-md bg-white"
                                    >
                                      <FiEdit size={18} color="#000" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleImageDeleteBanner}
                                      className="outline outline-white/50 p-1.5 rounded-md bg-white"
                                    >
                                      <HiOutlineTrash size={18} color="#000" />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="py-9 bg-white/10 cursor-pointer">
                                  <label htmlFor="file-input">
                                    <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                                      <IoMdImages size={28} />
                                      <p className="font-pally-regular text-[#F58B86] underline">
                                        Add Photo
                                      </p>
                                      <p className="font-pally-medium text-[#F7D394]">
                                        Resolution size : 320 x 489
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
                            onChange={handleImageUploadBanner}
                            ref={(e) => {
                              field.ref(e);
                              fileInputRefBanner.current = e; // Set the ref
                            }}
                            style={{ display: "none" }}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>

                  <div className="flex flex-col lg:flex-row gap-8 mt-7">
                    <FormItem className="w-full max-w-48">
                      <FormLabel className="text-white font-pally-medium">
                        Thumbnail
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="event_thumbnail"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="imageThumbnail-uploader">
                                {imageThumbnail ? (
                                  <div className="relative">
                                    <div className="relative h-[20vh] bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden ">
                                      <img
                                        src={imageThumbnail}
                                        alt="Uploaded"
                                        className="w-auto"
                                      />
                                    </div>
                                    <div className="absolute inset-0 bg-black opacity-50"></div>

                                    <div className="absolute right-5 bottom-0 z-10 text-center text-white p-4 flex gap-5">
                                      <button
                                        type="button"
                                        onClick={handleEditClickthumbnail}
                                        className="outline outline-white/50 p-1.5 rounded-md bg-white"
                                      >
                                        <FiEdit size={18} color="#000" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={handleImageDeleteThumbnail}
                                        className="outline outline-white/50 p-1.5 rounded-md bg-white"
                                      >
                                        <HiOutlineTrash
                                          size={18}
                                          color="#000"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="py-9 bg-white/10 cursor-pointer rounded-lg">
                                    <label htmlFor="file-input-thumbnail">
                                      <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                                        <IoMdImages size={28} />
                                        <p className="font-pally-regular text-[#F58B86] underline">
                                          Add Photo
                                        </p>
                                        <p className="font-pally-medium text-[#F7D394] text-sm mx-5 text-center">
                                          ( JPEG, PNG, GIF, no larger than 10MB.
                                          )
                                        </p>
                                      </div>
                                    </label>
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <input
                              id="file-input-thumbnail"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUploadThumbnail}
                              ref={(e) => {
                                field.ref(e);
                                fileInputRefThumbnail.current = e;
                              }}
                              style={{ display: "none" }}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormItem>
                    <div className="w-full space-y-4">
                      <FormItem className="w-full">
                        <FormLabel className="text-white" htmlFor="event_name">
                          Event Name
                        </FormLabel>
                        <FormField
                          control={form.control}
                          name="event_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="E.g., 'Summer Music Festival 2024'"
                                  type="text"
                                  id="event_name"
                                  className="w-full bg-white text-black font-pally-regular"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormItem>
                      <FormItem className="w-full">
                        <FormLabel
                          className="text-white"
                          htmlFor="event_description"
                        >
                          Description
                        </FormLabel>
                        <FormField
                          control={form.control}
                          name="event_description"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Max  char - 200 Words"
                                  id="event_description"
                                  className="w-full bg-white text-black font-pally-regular h-32 md:h-56"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormItem>
                    </div>
                  </div>
                </div>

                <div className="sticky z-50 bottom-0 bg-[#281E17]">
                  <Separator />
                  <div className="py-5 flex justify-between items-center">
                    <Button
                      onClick={() => {}}
                      variant="outline"
                      className="text-white border-white hover:bg-[#6c5442]"
                    >
                      Save Progress
                    </Button>

                    <div onClick={previous} className="flex items-center gap-8">
                      <Button
                        type="submit"
                        disabled={isPending}
                        variant="destructive"
                      >
                        {isPending || isUploading ? <Spinner /> : "Next"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepOne;
