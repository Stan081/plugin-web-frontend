import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { uploadImage } from "@/lib/utils";
import { AdContentForm, AdContentSchema } from "@/models/campaign";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
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
import { Input } from "@/components/ui/input";
import { FiEdit } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMdImages } from "react-icons/io";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Spinner from "@/tw-components/spinner";

const AdContent = () => {
  const { handleIsChecked, setCurrentStep } = useOrganiserDashContext();
  const [CamImage, setCamImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<AdContentForm>({
    mode: "all",
    defaultValues: {
      sponsor_image: null,
      ad_title: "",
      message: "",
      button_link: "",
    },
    resolver: yupResolver(AdContentSchema),
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

  const onSubmit = useCallback((payload: AdContentForm) => {
    console.log(payload);
    setCurrentStep(4);
    handleIsChecked("adContent");
  }, []);

  return (
    <div className="w-full lg:w-3/5 pt-10 lg:px-10 rounded-lg h-screen bg-white flex flex-col justify-between">
      <div className="lg:h-[75vh]">
        <div className="space-y-2 lg:space-y-4">
          <h2 className="text-2xl font-pally-medium">Ad details</h2>
          <p className="text-[#475367] font-pally-regular text-sm lg:text-lg">
            Decide the right audience for your event.
          </p>
          <Separator />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" relative mt-5 flex flex-col justify-between gap-5 w-full h-full "
          >
            <div className="flex flex-col gap-5">
              <FormItem className="w-full space-y-3">
                <FormLabel htmlFor="file-input-thumbnail">
                  Ad promotion Image
                </FormLabel>
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
                            <div className="py-9 bg-black/10 cursor-pointer rounded-lg">
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
              <FormItem className="w-full ">
                <FormLabel htmlFor="ad_title">Ad Title</FormLabel>
                <FormField
                  control={form.control}
                  name="ad_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter ads title"
                          type="text"
                          id="ad_title"
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

              <FormItem className="w-full">
                <FormLabel htmlFor="message">Message</FormLabel>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Max  char - 500"
                          id="message"
                          maxLength={500}
                          className="w-full bg-white text-black font-pally-regular h-32 md:h-56"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>

              <FormItem className="w-full ">
                <FormLabel htmlFor="button_link">
                  Button Link ( optional )
                </FormLabel>
                <FormField
                  control={form.control}
                  name="button_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Attach event’s page link here"
                          type="text"
                          id="button_link"
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
            </div>
            <div className="sticky z-50 bottom-0 bg-white">
              <Separator />
              <div className="py-5 flex justify-between items-center">
                <Button
                  // onClick={previousSetUpStep}
                  type="button"
                  variant="outline"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  // disabled={isPending || isUpdatePending}
                  variant="destructive"
                >
                  {false ? <Spinner /> : "Next"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdContent;
