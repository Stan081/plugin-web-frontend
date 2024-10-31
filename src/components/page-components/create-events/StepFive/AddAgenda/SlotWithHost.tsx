"use client";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { IoMdImages } from "react-icons/io";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FiEdit } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SlotWithHostForm,
  SlotWithHostSchema,
} from "@/models/create-event-schema";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { HiOutlineTrash } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AgendaSlotProps } from "./Slot";
import { uploadImage } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventAgenda } from "@/pages/api/mutate/create-events/eventAgenda";
import { Button } from "@/components/ui/button";
import Spinner from "@/tw-components/spinner";

interface SlotWithHostProps extends AgendaSlotProps {}

export const isHostTypes: { id: boolean; name: string }[] = [
  {
    id: false,
    name: "No",
  },
  {
    id: true,
    name: "Yes",
  },
];

const SlotWithHost: FC<SlotWithHostProps> = ({ handleReturnToList }) => {
  const { handleIsChecked, setIsHost, isHost } = useCreateEventContext();
  const [hostImage, setHostImage] = useState<string | null>(null);
  const fileInputRefThumbnail = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const form = useForm<SlotWithHostForm>({
    mode: "all",
    defaultValues: {
      start_time: "",
      end_time: "",
      host_thumbnail: "",
      isHost: isHost,
      host_name: "",
      agenda_title: "",
      agenda_description: "",
    },
    resolver: yupResolver(SlotWithHostSchema),
  });

  const { toast } = useToast();

  const client = useQueryClient();

  // Handle image upload for banner
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true); // Start spinner

      try {
        const uploadResult = await uploadImage(file);

        const imageUrl = uploadResult.secure_url;

        setHostImage(imageUrl);
        form.setValue("host_thumbnail", imageUrl);
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
  const handleImageDelete = () => {
    setHostImage(null);
    form.setValue("host_thumbnail", "");
    if (fileInputRefThumbnail.current) {
      fileInputRefThumbnail.current.value = "";
    }
  };

  // Handle edit for vendor thumbnail
  const handleEditClick = () => {
    if (fileInputRefThumbnail.current) {
      fileInputRefThumbnail.current.click();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EventAgenda(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Event Agenda has been added",
          description: `${response?.message}`,
        });
        client.invalidateQueries({ queryKey: ["eventAgendas"] });
        handleReturnToList();
      }
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    },
  });

  const onSubmit = useCallback(
    async (payload: SlotWithHostForm) => {
      console.log(payload);

      const data = {
        title: payload?.agenda_title,
        description: payload?.agenda_description,
        startTime: payload?.start_time,
        endTime: payload?.end_time,
        host: {
          name: payload?.host_name,
          photo: payload?.host_thumbnail,
        },
      };

      mutate(data);

    },
    []
  );

  return (
    <div>
      {isUploading && <SpinnerOverlay />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 w-full h-full"
        >
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 my-7">
            <FormItem className="w-48 space-y-3">
              <FormField
                control={form.control}
                name="host_thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="vendorImage-uploader">
                        {hostImage ? (
                          <div className="relative">
                            <div className="relative h-[20vh] bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden rounded-md ">
                              <img
                                src={hostImage}
                                alt="Uploaded"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black opacity-50"></div>

                            <div className="absolute right-5 bottom-0 z-10 text-center text-white p-4 flex gap-5">
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
                          <div className="py-9 bg-white/10 cursor-pointer rounded-lg">
                            <label htmlFor="file-input-thumbnail">
                              <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                                <IoMdImages size={28} />
                                <p className="font-pally-regular text-[#F58B86] underline">
                                  Add Photo
                                </p>
                                <p className="font-pally-medium text-[#F7D394] text-sm mx-5 text-center">
                                  ( JPEG, PNG, GIF, no larger than 10MB. )
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
                      onChange={handleImageUpload}
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
              <FormLabel className="mt-3 block text-white font-pally-medium">
                Pass Thumbnail ( optional )
              </FormLabel>
            </FormItem>
            <div className="w-full">
              <div className="flex justify-start items-baseline gap-4">
                <p className="font-pally-regular text-base md:text-lg">
                  Do you have a Host?
                </p>
                <div className="flex flex-wrap gap-4 text-white">
                  {isHostTypes.map(
                    (type: { id: boolean; name: string }, index) => (
                      <button
                        key={index}
                        onClick={() => setIsHost(!isHost)}
                        className={`py-2 px-4 rounded-full border ${
                          isHost === type.id
                            ? "bg-white text-black"
                            : "border-white"
                        }`}
                      >
                        {type.name}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="space-y-4 mt-5">
                <FormItem className="w-full">
                  <FormLabel className="text-white" htmlFor="host_name">
                    Host Name
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="host_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter host name"
                            type="text"
                            id="host_name"
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
                  <FormLabel className="text-white" htmlFor="agenda_title">
                    Agenda Title
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="agenda_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter session title"
                            type="text"
                            id="agenda_title"
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
                    htmlFor="agenda_description"
                  >
                    Agenda description ( Optional )
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="agenda_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Max  char - 200 Words"
                            id="agenda_description"
                            className="w-full bg-white text-black font-pally-regular h-32 md:h-56"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormItem>
                <div className="flex gap-6">
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
                    <FormLabel className="text-white" htmlFor="start_time">
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
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <Button
              type="submit"
              disabled={isPending}
              variant="destructive"
              className="w-full"
            >
              {isPending ? <Spinner /> : "Save Session"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SlotWithHost;
