import React, { FC, useCallback, useRef, useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { HiOutlineTrash } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { uploadImage } from "@/lib/utils";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { IoMdImages } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateOrganiserProfile } from "@/pages/api/mutate/organiser/organiserProfile";
import Spinner from "@/tw-components/spinner";
import { useMe } from "@/pages/api/query/me";
import { useGetOrgProfileById } from "@/hooks/organiserProfile/useGetOrganiserProfile";
import { getCookie } from "@/lib/cookies";

interface ProfileFormModalProps {
  open: boolean;
  close: () => void;
}

const ProfileFormModal: FC<ProfileFormModalProps> = ({ open, close }) => {
  const { data: orgProfile } = useGetOrgProfileById();
  const [imageBanner, setImageBanner] = useState<string | null>(
    orgProfile?.data?.banner || null
  );
  const [imageThumbnail, setImageThumbnail] = useState<string | null>(
    orgProfile?.data?.thumbnail || null
  );
  const fileInputRefBanner = useRef<HTMLInputElement | null>(null);
  const fileInputRefThumbnail = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { data: me } = useMe();

  const form = useForm<OrganiserProfileForm>({
    mode: "all",
    defaultValues: {
      organiser_name: orgProfile?.data?.name ?? "",
      organiser_photo: orgProfile?.data?.thumbnail ?? null,
      organiser_banner: orgProfile?.data?.banner ?? null,
      organiser_bio: orgProfile?.data?.bio ?? "",
      tagline: orgProfile?.data?.tagline ?? "",
      social_media: {
        facebook: orgProfile?.data?.socials?.facebook ?? "",
        instagram: orgProfile?.data?.socials?.instagram ?? "",
      },
    },
    resolver: yupResolver(OrganiserProfileSchema),
  });

  const { toast } = useToast();

  const client = useQueryClient();

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
        form.setValue("organiser_banner", imageUrl);
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
    form.setValue("organiser_banner", "");
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
        form.setValue("organiser_photo", imageUrl);
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
    form.setValue("organiser_photo", "");
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
    mutationFn: (data: any) => CreateOrganiserProfile(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "File has been uploaded",
          description: `${response?.message}`,
        });
        client.invalidateQueries({ queryKey: ["me"] });
        close();
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error?.message,
      });
    },
  });

  const onSubmit = useCallback((payload: OrganiserProfileForm) => {
    const data = {
      userId: me?.data?._id,
      banner: payload?.organiser_banner,
      thumbnail: payload?.organiser_photo,
      name: payload?.organiser_name,
      tagline: payload?.tagline,
      bio: payload?.organiser_bio,
      socials: {
        facebook: payload?.social_media?.facebook ?? "",
        instagram: payload?.social_media?.instagram,
      },
    };
    mutate(data);
    console.log(data);
  }, []);
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      {isUploading && <SpinnerOverlay />}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-2xl h-[90vh] overflow-y-auto rounded-xl bg-white pt-6 px-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 space-y-5"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium flex justify-between items-start"
            >
              <p className="flex items-center gap-2 font-pally-medium text-black text-2xl">
                Add Organiser Profile
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
                    <FormLabel>Organiser Banner</FormLabel>
                    <FormField
                      control={form.control}
                      name="organiser_banner"
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
                                <div className="py-9 bg-black/10 cursor-pointer">
                                  <label htmlFor="file-input">
                                    <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                                      <IoMdImages size={28} />
                                      <p className="font-pally-regular text-[#F58B86] underline">
                                        Add Photo
                                      </p>
                                      <p className="font-pally-medium text-[#736244]">
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
                  <FormItem className="w-full max-w-48">
                    <FormLabel>Organiser photo</FormLabel>
                    <FormField
                      control={form.control}
                      name="organiser_photo"
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

                                  <div className=" text-center text-white p-4 flex gap-5">
                                    <button
                                      type="button"
                                      onClick={handleEditClickthumbnail}
                                      className="outline outline-black/50 p-1.5 rounded-md"
                                    >
                                      <FiEdit size={18} color="#000" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleImageDeleteThumbnail}
                                      className="outline outline-[#b23632] py-1 px-1.5 rounded-md"
                                    >
                                      <HiOutlineTrash
                                        size={18}
                                        color="#b23632"
                                      />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="py-5 bg-black/10 cursor-pointer rounded-lg">
                                  <label htmlFor="file-input-thumbnail">
                                    <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                                      <IoMdImages size={28} />
                                      <p className="font-pally-regular text-[#F58B86] underline">
                                        Add Photo
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

                  <div className="sticky bottom-0 bg-white py-4">
                    <Separator />

                    <div className="flex justify-end mt-4">
                      <Button
                        variant="destructive"
                        type="submit"
                        disabled={isPending}
                      >
                        {isPending ? <Spinner /> : `Add Profile`}
                      </Button>
                    </div>
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
