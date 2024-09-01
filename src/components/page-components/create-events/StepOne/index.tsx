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

const pageContents = [
  "Make your event name short and memorable.",
  "Focus on unique aspects to make your description engaging.",
];

const StepOne: React.FC<StepsProps> = ({ next, previous }) => {
  const [imageBanner, setImageBanner] = useState<string | null>(null);
  const [imageThumbnail, setImageThumbnail] = useState<string | null>(null);
  const fileInputRefBanner = useRef<HTMLInputElement | null>(null);
  const fileInputRefThumbnail = useRef<HTMLInputElement | null>(null);

  const form = useForm<EventStepOne>({
    mode: "all",
    defaultValues: {
      event_banner: "",
      event_thumbnail: "",
      event_name: "",
      event_description: "",
    },
    resolver: yupResolver(EventStepOneSchema),
  });

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  // Handle image upload for banner
  const handleImageUploadBanner = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBanner(reader.result as string);
        form.setValue("event_banner", reader.result as string);
      };
      reader.readAsDataURL(file);
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
  const handleImageUploadThumbnail = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageThumbnail(reader.result as string);
        form.setValue("event_thumbnail", reader.result as string);
      };
      reader.readAsDataURL(file);
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

  const onSubmit = useCallback(async (payload: EventStepOne) => {
    console.log(payload);
    next();
  }, []);

  return (
    <div className="flex items-start gap-12
    ">
      <div className="w-full lg:w-1/2">
        <Intro contents={pageContents} title="Tell us about your event" />
      </div>
      <div className="w-full lg:w-1/2">
        <FormContainer formTitle="Basic Information" currPosition={[20, 0, 0]}>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-between gap-4 w-full h-full"
              >
                <div className="h-[58vh] whitespace-normal overflow-y-auto">
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

                  <div className="flex gap-8 mt-7">
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
                                  disabled={isLoading}
                                  className="w-full bg-white text-black font-pally-regular h-40"
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

                <div className="sticky z-50 bottom-0">
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
                      <Button className="cursor-pointer hover:outline hover:outline-white/50 p-2 rounded-lg">
                        Back
                      </Button>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        variant="destructive"
                      >
                        {isLoading ? "Submitting..." : "Next"}
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
