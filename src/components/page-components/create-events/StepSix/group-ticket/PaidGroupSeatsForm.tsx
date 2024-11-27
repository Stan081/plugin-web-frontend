"use client";

import {
  PaidSeatSection,
  PaidSeatSectionFormSchema,
} from "@/models/create-event-schema";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { yupResolver } from "@hookform/resolvers/yup";
import React, {
  FC,
  useCallback,
  useEffect,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GroupSeatProps } from "./GroupSeat";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";
import { uploadImage } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { IoMdImages } from "react-icons/io";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { extractColors } from "extract-colors";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { EventGroupPaid } from "@/pages/api/mutate/create-events/EventGroupPaid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/tw-components/spinner";

interface PaidGroupSeatsFormProps extends GroupSeatProps {}

const PaidGroupSeatsForm: FC<PaidGroupSeatsFormProps> = ({
  handleReturnToList,
}) => {
  const { selectTicket, seatType } = useCreateEventContext();
  const [labelImage, setlabelImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [getSelectedColor, setGetSelectedColor] = useState<string[]>([]);

  const form = useForm<PaidSeatSection>({
    mode: "all",
    defaultValues: {
      seat_type: seatType,
      ticket_type: selectTicket,
      ticket_name: "",
      ticket_category: "",
      ticket_quantity: null,
      ticket_price: null,
      start_date: null,
      end_date: null,
      start_time: "",
      end_time: "",
      ticket_perks: "",
      label_image: "",
      label_color: "",
    },
    resolver: yupResolver(PaidSeatSectionFormSchema),
  });

  useEffect(() => {
    if (!labelImage) return;

    const image = new Image();
    image.src = labelImage;

    image.onload = () => {
      // Only proceed if the image has valid width and height
      if (image.width > 0 && image.height > 0) {
        extractColors(labelImage)
          .then((resp) => {
            const colors = resp.map((item) => item.hex);
            setGetSelectedColor((prev) => [...prev, ...colors]);
          })
          .catch(console.error);
      } else {
        console.error("Image dimensions are invalid");
      }
    };

    image.onerror = () => {
      console.error("Failed to load the image");
    };
  }, [labelImage]);

  useEffect(() => {
    form.setValue("seat_type", seatType);
  }, [seatType, form.setValue]);

  useEffect(() => {
    form.setValue("ticket_type", selectTicket);
  }, [selectTicket, form.setValue]);

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

        setlabelImage(imageUrl);
        form.setValue("label_image", imageUrl);
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
    setlabelImage(null);
    form.setValue("label_image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle edit for vendor thumbnail
  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EventGroupPaid(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Paid group ticket has been added",
          description: `${response?.message}`,
        });
        client.invalidateQueries({ queryKey: ["groupEvents"] });
        handleReturnToList();
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

  const onSubmit = useCallback((payload: PaidSeatSection) => {
    const data = {
      groupedTicketType: payload.seat_type,
      ticketName: payload.ticket_name,
      ticketCategory: payload.ticket_category,
      ticketQuantity: payload.ticket_quantity,
      ticketPrice: payload.ticket_price,
      startDate: payload.start_date,
      startTime: payload.start_time,
      endDate: payload.end_date,
      endTime: payload.end_time,
      ticketPeaks: payload.ticket_perks,
      seatMap: payload?.label_image ?? "",
      color: payload?.label_color ?? "",
    };
    mutate(data);
  }, []);

  return (
    <div>
      {isUploading && <SpinnerOverlay />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-10 w-full h-full "
        >
          <div className="flex flex-col justify-between gap-4 h-auto w-full">
            <FormItem className="w-full ">
              <FormLabel className="text-white" htmlFor="ticket-name">
                Ticket Name
              </FormLabel>
              <FormField
                control={form.control}
                name="ticket_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter ticket name"
                        type="text"
                        id="ticket-name"
                        className="w-full bg-white text-black font-pally-regular"
                        {...field}
                        maxLength={200}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>

            <FormItem className="col-span-1">
              <FormLabel className="text-white" htmlFor="ticket_category">
                Ticket category
              </FormLabel>
              <FormField
                control={form.control}
                name="ticket_category"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={String(field.value)}
                        >
                          <SelectTrigger
                            id="ticket_category"
                            className="border h-10 py-1 flex justify-between bg-white text-black items-center gap-2 rounded-md p-2 w-full"
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="w-full border z-40 bg-primary-foreground rounded-sm bg-white">
                            {["Non-seated", "Seated"].map((state, index) => {
                              return (
                                <SelectItem key={index} value={state}>
                                  <div className="flex items-center gap-2">
                                    {state}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </FormItem>

            <div className="flex  items-start gap-4">
              <FormItem className="w-1/2">
                <FormLabel className="text-white" htmlFor="price-pass">
                  Price ( per ticket )
                </FormLabel>
                <FormField
                  control={form.control}
                  name="ticket_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="₦ Enter amount"
                          type="number"
                          id="price-pass"
                          className="w-full bg-white text-black font-pally-regular"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>
              <FormItem className="w-1/2 ">
                <FormLabel className="text-white" htmlFor="ticket-quantity">
                  Ticket Quantity
                </FormLabel>
                <FormField
                  control={form.control}
                  name="ticket_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter ticket quantity"
                          type="number"
                          id="ticket-quantity"
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

            <div className="flex items-start gap-4">
              <FormItem className="w-full">
                <FormLabel className="text-white" htmlFor="start_date">
                  Sales starts on
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
              <FormItem className="w-full">
                <FormLabel className="text-white" htmlFor="start_time">
                  Sales start time
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
            </div>

            <div className="flex items-start gap-4">
              <FormItem className="w-full">
                <FormLabel className="text-white" htmlFor="end_date">
                  Sales end on
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
              <FormItem className="w-full">
                <FormLabel className="text-white" htmlFor="end_time">
                  Sales end time
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
            </div>

            <FormItem>
              <FormLabel className="text-white" htmlFor="ticket_perks">
                Ticket Peaks
              </FormLabel>
              <FormField
                control={form.control}
                name="ticket_perks"
                render={({ field }) => (
                  <FormControl>
                    <Textarea
                      placeholder="Max  char - 200 Words"
                      id="ticket_perks"
                      className="w-full bg-white text-black font-pally-regular h-32 md:h-56 focus:outline-none focus:border-none"
                      {...field}
                    />
                  </FormControl>
                )}
              />
              <FormMessage />
            </FormItem>

            <Separator />

            <FormItem className="w-full mt-6 space-y-3 px-4">
              <p className="text-base font-pally-regular text-white">
                {" "}
                Labeling helps you and your attendees easily identify and find
                sections, seats or areas in the venue. Use labels to make your
                tickets more unique
              </p>
              <FormField
                control={form.control}
                name="label_image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="image-uploader">
                        {labelImage ? (
                          <div className="relative">
                            <div className="relative h-[20vh] bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden rounded-md ">
                              <img
                                src={labelImage}
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
                                  Tap to Upload
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
                        fileInputRef.current = e;
                      }}
                      style={{ display: "none" }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel
                htmlFor="file-input-thumbnail"
                className="mt-3 text-white font-pally-medium"
              >
                Label Guide ( optional )
              </FormLabel>
            </FormItem>

            <FormItem className="w-full px-4">
              <FormLabel className="text-white">Label color </FormLabel>
              <FormField
                control={form.control}
                name="label_color"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={String(field.value)}
                        >
                          <SelectTrigger className="border h-10 py-1 flex justify-between bg-white text-black items-center gap-2 rounded-md p-2 w-full">
                            <SelectValue placeholder="Assign colour" />
                          </SelectTrigger>
                          <SelectContent className="w-full border z-40 bg-primary-foreground rounded-sm bg-white">
                            {getSelectedColor.length !== 0 ? (
                              getSelectedColor.map((state) => {
                                return (
                                  <SelectItem key={state} value={state}>
                                    <div className="flex items-center gap-2">
                                      <span
                                        style={{ backgroundColor: state }}
                                        className="h-5 w-5 border rounded"
                                      />
                                      {state}
                                    </div>
                                  </SelectItem>
                                );
                              })
                            ) : (
                              <p className="font-pally-regular text-sm">
                                Upload an image to get seat colour
                              </p>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </FormItem>
          </div>

          <div className="flex justify-end gap-4 mb-4">
            <div
              onClick={handleReturnToList}
              className="p-2 rounded flex justify-center items-center bg-[#463B34] cursor-pointer"
            >
              <p className="text-white font-pally-regular">Cancel</p>
            </div>
            <Button variant="destructive" type="submit">
              {isPending ? <Spinner /> : `Save Session`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PaidGroupSeatsForm;
