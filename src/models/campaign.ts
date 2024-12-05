import * as yup from "yup";

export const EmailCampaignSchema = yup.object().shape({
  campaign_image: yup
    .mixed()
    .nullable()
    .test("required", "Image is required", (value) => {
      return value !== null;
    }),
  campaign_name: yup.string().required("Campaign name is required"),
  sender_name: yup.string().required("Sender name is required"),
  email_subject: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
  message: yup.string().optional(),
});

export const SponsorListingSchema = yup.object().shape({
  sponsor_image: yup
    .mixed()
    .nullable()
    .test("required", "Image is required", (value) => {
      return value !== null;
    }),
});

export type SponsorListingForm = yup.InferType<typeof SponsorListingSchema>;
export type EmailCampaignForm = yup.InferType<typeof EmailCampaignSchema>;
