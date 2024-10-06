import React, { FC, useCallback, useMemo } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseLine } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
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
import {
  OrganiserProfileForm,
  OrganiserProfileSchema,
} from "@/models/create-event-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ProfileFormModalProps {
  open: boolean;
  close: () => void;
}

const ProfileFormModal: FC<ProfileFormModalProps> = ({ open, close }) => {
  const form = useForm<OrganiserProfileForm>({
    mode: "all",
    defaultValues: {
      organiser_name: "",
      organiser_bio: "",
      tagline: "",
      social_media: {
        facebook: "",
        instagram: "",
      },
    },
    resolver: yupResolver(OrganiserProfileSchema),
  });

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  const onSubmit = useCallback(async (payload: OrganiserProfileForm) => {
    console.log(payload);
  }, []);
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-2xl rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 space-y-5"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium flex justify-between items-start"
            >
              <p className="flex items-center gap-2 font-pally-medium text-black text-2xl">
                Add Organizer Profile
              </p>
              <div
                onClick={close}
                className="p-1.5 rounded-full bg-gray-200 cursor-pointer"
              >
                <RiCloseLine size={20} />
              </div>
            </DialogTitle>
            <Separator />
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col justify-between gap-4 w-full h-full"
                >
                  <FormItem className="w-full">
                    <FormLabel className="" htmlFor="organiser_name">
                      Organiser Name
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="organiser_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter organiser name"
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
                  <FormItem className="w-full">
                    <FormLabel htmlFor="organiser_bio">
                      Organizer Bio ( Max word count is 500 )
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="organiser_bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Write a bio about yourself"
                              id="organiser_bio"
                              disabled={isLoading}
                              maxLength={500}
                              className="w-full bg-white text-black font-pally-regular h-32 md:h-40"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>
                  <FormItem className="w-full">
                    <FormLabel className="" htmlFor="tagline">
                      Tagline for event pages ( Optional )
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="tagline"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Write a short description for this organizer, this shows on all your event pages. "
                              id="organiser_bio"
                              disabled={isLoading}
                              maxLength={500}
                              className="w-full bg-white text-black font-pally-regular h-28"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>

                  <div>
                    <div className="space-y-1.5 my-4">
                      <p className="text-[#101928] text-xl font-pally-medium">
                        Social media links{" "}
                      </p>
                      <p className="text-[#667185] text-sm font-pally-regular">
                        Let attendees know how to connect with you
                      </p>
                    </div>

                    <FormItem className="w-full">
                      <FormLabel className="" htmlFor="facebook">
                        Facebook profile link
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="social_media.facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="facebook handle url"
                                type="text"
                                id="facebook"
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
                    <FormItem className="w-full">
                      <FormLabel className="" htmlFor="instagram">
                        Facebook profile link
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name="social_media.instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="instagram handle url"
                                type="text"
                                id="instagram"
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

                  <Separator />

                  <div className="flex justify-end mb-4">
                    <Button variant="destructive" type="submit">
                      Add Profile
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProfileFormModal;
