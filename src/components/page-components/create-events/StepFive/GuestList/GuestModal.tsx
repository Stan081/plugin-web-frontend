import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventGuest, EventGuestSchema } from "@/models/create-event-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiOutlineTrash } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { IoMdImages } from "react-icons/io";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { uploadImage } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventGuestList } from "@/pages/api/mutate/create-events/eventGuestList";
import Spinner from "@/tw-components/spinner";

interface GuestModalProps {
  isOpen: boolean;
  close: () => void;
}

const GuestModal: React.FC<GuestModalProps> = ({ isOpen, close }) => {
  const [guestImage, setGuestImage] = React.useState<string | null>(null);
  const fileInputRefBanner = React.useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const form = useForm<EventGuest>({
    mode: "all",
    defaultValues: {
      guest_image: "",
      guest_name: "",
      guest_role: "",
    },
    resolver: yupResolver(EventGuestSchema),
  });

  const { toast } = useToast();

  // Handle image upload for guest
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setIsUploading(true); // Start spinner

      try {
        const uploadResult = await uploadImage(file);

        const imageUrl = uploadResult.secure_url;

        setGuestImage(imageUrl);
        form.setValue("guest_image", imageUrl);
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
  const handleImageDelete = () => {
    setGuestImage(null);
    form.setValue("guest_image", "");
    if (fileInputRefBanner.current) {
      fileInputRefBanner.current.value = "";
    }
  };

  // Handle edit for banner
  const handleEditClick = () => {
    if (fileInputRefBanner.current) {
      fileInputRefBanner.current.click();
    }
  };
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EventGuestList(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Event Agenda has been added",
          description: `${response?.message}`,
        });
        client.invalidateQueries({ queryKey: ["eventGuests"] });
        close();
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
    async (payload: EventGuest) => {
      console.log(payload);

      const data = {
        name: payload?.guest_name,
        photo: payload?.guest_image,
        role: payload?.guest_role,
      };

      mutate(data);

      form.reset({
        guest_image: "",
        guest_name: "",
        guest_role: "",
      });

      if (fileInputRefBanner.current) {
        fileInputRefBanner.current.value = "";
      }
    },
    [form]
  );

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        {isUploading && <SpinnerOverlay />}
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-[#FDE5E3] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium flex justify-between items-start"
            >
              <p className="font-pally-medium text-[#281E17] text-xl">
                Add Guest{" "}
              </p>
              <div
                onClick={close}
                className="p-1.5 rounded-full bg-gray-600 cursor-pointer"
              >
                <RiCloseLine size={20} color="#fff" />
              </div>
            </DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-5 z-50"
              >
                <FormItem className="w-full">
                  <FormField
                    control={form.control}
                    name="guest_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            {guestImage ? (
                              <div className="flex items-start w-full max-w-72 mx-auto md:ml-20">
                                <div className="h-[20vh] w-full max-w-48 flex items-center justify-center overflow-hidden">
                                  <Image
                                    width={192}
                                    height={192}
                                    src={guestImage}
                                    alt="Uploaded"
                                    className="w-auto h-auto object-cover rounded-xl"
                                  />
                                </div>

                                <div className="text-center text-white p-4 flex flex-col gap-5">
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
                              <div className="py-9 rounded-lg w-full max-w-48 mx-auto bg-white/70 cursor-pointer">
                                <label htmlFor="file-input">
                                  <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                                    <IoMdImages size={28} />
                                    <p className="font-pally-regular text-[#F58B86] underline">
                                      Add Photo
                                    </p>
                                    <p className="text-sm font-pally-medium text-[#443a29]">
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
                          onChange={handleImageUpload}
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

                <FormItem className="w-full">
                  <FormLabel className="text-[#667185]" htmlFor="event_name">
                    Guest Name
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="guest_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="E.g. John Doe"
                            type="text"
                            id="guest_name"
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
                  <FormLabel className="text-[#667185]" htmlFor="event_name">
                    Guest Role (Optional)
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="guest_role"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="E.g MC, Artist, DJ'"
                            type="text"
                            id="event_name"
                            autoFocus
                            className="w-full bg-white font-pally-regular"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormItem>

                <Button type="submit" variant="destructive" className="w-full">
                  {isPending ? <Spinner /> : "Save"}
                </Button>
              </form>
            </Form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default GuestModal;
