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

const EmailCampiagn = () => {
  const { isClickedCampaign, nextSetUpStep } = useOrganiserDashContext();
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
  }, []);
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 flex flex-col justify-between gap-10 w-full h-full "
        >
          <FormItem className="w-full ">
            <FormLabel htmlFor="ticket-name">Campaign Name</FormLabel>
            <FormField
              control={form.control}
              name="campaign_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter campaign name"
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
        </form>
      </Form>
    </div>
  );
};

export default EmailCampiagn;
