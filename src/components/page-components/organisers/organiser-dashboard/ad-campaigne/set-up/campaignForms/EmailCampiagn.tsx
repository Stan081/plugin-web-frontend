import { EmailCampaignForm, EmailCampaignSchema } from "@/models/campaign";
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
import { uploadImage } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { IoMdImages } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { RiInformationFill } from "react-icons/ri";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Spinner from "@/tw-components/spinner";

const EmailCampiagn = () => {
  const { nextSetUpStep } = useOrganiserDashContext();
  const [CamImage, setCamImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<EmailCampaignForm>({
    mode: "all",
    defaultValues: {
      campaign_image: null,
      campaign_name: "",
      sender_name: "",
      email_subject: "",
      message: "",
    },
    resolver: yupResolver(EmailCampaignSchema),
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
        form.setValue("campaign_image", imageUrl);
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
    form.setValue("campaign_image", "");
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

  const onSubmit = useCallback((payload: EmailCampaignForm) => {
    console.log(payload);

    const data = {};
    // mutate(data);
    nextSetUpStep()
  }, []);
  return (
    <div className="px-5 h-[80vh] overflow-y-auto whitespace-nowrap">
      {isUploading && <SpinnerOverlay />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 flex flex-col justify-between gap-5 w-full h-full "
        >
          <FormItem className="w-full ">
            <FormLabel htmlFor="campaign-name">Campaign Name</FormLabel>
            <FormField
              control={form.control}
              name="campaign_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter campaign name"
                      type="text"
                      id="campaign-name"
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
          <FormItem className="w-full space-y-3">
            <FormLabel htmlFor="file-input-thumbnail">
              Label Guide ( optional )
            </FormLabel>
            <FormField
              control={form.control}
              name="campaign_image"
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
            <FormLabel htmlFor="sender_name">Sender's Name</FormLabel>
            <FormField
              control={form.control}
              name="sender_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter sender’s name"
                      type="text"
                      id="sender_name"
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
          <FormItem className="w-full ">
            <FormLabel htmlFor="email_subject">Email Subject</FormLabel>
            <FormField
              control={form.control}
              name="email_subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your email subject"
                      type="email"
                      id="email_subject"
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
          <div className="text-[#523300] flex gap-3 items-center border border[#523300]/20 bg-[#FEF6E7] p-2 rounded-lg text-sm">
            <RiInformationFill size={16} /> This message would be sent to
            attendees that booked this event
          </div>
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

          <div className="sticky z-50 bottom-0 bg-white">
            <Separator />
            <div className="py-5 flex justify-end items-center">
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
  );
};

export default EmailCampiagn;
