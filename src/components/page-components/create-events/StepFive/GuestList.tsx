import { Separator } from "@/components/ui/separator";
import React, { useMemo } from "react";
import { LuClipboardList } from "react-icons/lu";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseLine } from "react-icons/ri";
import { useFieldArray, useForm } from "react-hook-form";
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

const GuestList = () => {
  let [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [guestImage, setGuestImage] = React.useState<string | null>(null);
  const fileInputRefBanner = React.useRef<HTMLInputElement | null>(null);

  const form = useForm<EventGuest>({
    mode: "all",
    defaultValues: {
      guest_image: "",
      guest_name: "",
      guest_role: "",
    },
    resolver: yupResolver(EventGuestSchema),
  });

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  // Handle image upload for guest
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGuestImage(reader.result as string);
        form.setValue("guest_image", reader.result as string);
      };
      reader.readAsDataURL(file);
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

  const onSubmit = React.useCallback(async (payload: EventGuest) => {
    console.log(payload);
  }, []);

  function open() {
    setIsOpen(!isOpen);
  }

  function close() {
    setIsOpen(false);
  }

  const GuestEmptyState = () => {
    return (
      <div className="border border-[#423730] rounded-xl w-full max-w-sm mx-auto p-6 my-5 space-y-5">
        <div className="flex gap-4">
          <div className="bg-[#FFF6F1] rounded-lg px-5 py-3">
            <LuClipboardList size={30} color="#000" />
          </div>
          <div className="space-y-0.5">
            <p className="font-pally-medium">Create a guest list </p>
            <p className="font-pally-regular text-sm text-white/60">
              Add a guest list to your event for more controlled access
            </p>
          </div>
        </div>

        <button
          onClick={open}
          type="button"
          className="border border-dashed p-3 rounded-lg w-full hover:bg-[#423730]/50"
        >
          New Guest
        </button>
      </div>
    );
  };

  const GuestModal = () => {
    return (
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-[#FDE5E3] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium flex justify-between items-start"
              >
                <h3 className="font-pally-medium text-[#281E17] text-xl">
                  Add Guest{" "}
                </h3>
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
                              placeholder="E.g. John Doe'"
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

                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="destructive"
                    className="w-full"
                  >
                    {isLoading ? "Submitting..." : "Save"}
                  </Button>
                </form>
              </Form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  };

  return (
    <div className="mx-3 md:mx-8 flex flex-col gap-5">
      <p className="font-pally-regular text-sm text-white/60">
        Create a special guest for your event{" "}
      </p>

      <Separator decorative />

      <GuestEmptyState />

      <GuestModal />
    </div>
  );
};

export default GuestList;
