import { useToast } from "@/components/ui/use-toast";
import { uploadImage } from "@/lib/utils";
import { SponsorListingForm, SponsorListingSchema } from "@/models/campaign";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMdImages } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Spinner from "@/tw-components/spinner";

const SponsorListing = () => {
  const { setSponsorCampaignData, nextSetUpStep, handleIsChecked } =
    useOrganiserDashContext();
  const [CamImage, setCamImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<SponsorListingForm>({
    mode: "all",
    defaultValues: {
      sponsor_image: null,
    },
    resolver: yupResolver(SponsorListingSchema),
  });

  const { toast } = useToast();

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true); // Start spinner

      try {
        const uploadResult = await uploadImage(file);

        const imageUrl = uploadResult.secure_url;

        setCamImage(imageUrl);
        form.setValue("sponsor_image", imageUrl);
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
    setCamImage(null);
    form.setValue("sponsor_image", "");
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

  const onSubmit = useCallback((payload: SponsorListingForm) => {
    setSponsorCampaignData(payload);
    nextSetUpStep();
    handleIsChecked("campaignContent");
  }, []);
  return (
    <div className="h-full">
      {isUploading && <SpinnerOverlay />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 flex flex-col justify-between gap-5 w-full h-full "
        >
          <FormItem className="w-full space-y-3">
            <FormLabel htmlFor="file-input-thumbnail">Post image</FormLabel>
            <FormField
              control={form.control}
              name="sponsor_image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="image-uploader">
                      {CamImage ? (
                        <div className="relative">
                          <div className="relative h-[20vh] bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden rounded-md ">
                            <img
                              src={CamImage}
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
                        <div className="py-6 md:py-14 bg-black/10 cursor-pointer rounded-lg">
                          <label htmlFor="file-input-thumbnail">
                            <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                              <IoMdImages size={28} />
                              <p className="font-pally-regular text-[#F58B86] underline">
                                Tap to Upload
                              </p>
                              <p className="font-pally-medium text-[#28231b] text-sm mx-5 text-center">
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
          </FormItem>
          <div className="sticky z-50 bottom-0 bg-white">
            <Separator />
            <div className="py-5 flex justify-end items-center">
              <Button
                type="submit"
                disabled={!CamImage}
                variant="destructive"
              >
                 Next
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SponsorListing;
