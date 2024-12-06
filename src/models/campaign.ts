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
  reply_address: yup.string().email("Invalid email address").optional(),
  page_link: yup
    .string()
    .url("Your URL must be an Plugin link and start with http:// or https://")
    .optional(),
});

export const SponsorListingSchema = yup.object().shape({
  sponsor_image: yup
    .mixed()
    .nullable()
    .test("required", "Image is required", (value) => {
      return value !== null;
    }),
});

// Schema for social media ads
export const TargetAudienceSchema = yup.object().shape({
  audience_interest: yup
    .array()
    .of(yup.string().required("Choose audience interest")),
  audience_gender: yup.string().required("Choose your gender"),
  min_age: yup.number().required("Add minimum age of target audience"),
  max_age: yup.number().required("Add maximum age of target audience"),
  location: yup.string().required("Location is required"),
});

export const BudgetDurationSchema = yup.object().shape({
  start_date: yup.date().required("Add start campaign date"),
  end_date: yup.date().required("Add end campaign date"),
  duration: yup
    .number()
    .truncate()
    .positive("Must be a positive number")
    .required("ads duration is required"),
  budget: yup.number().required("budget is required"),
});

export const AdContentSchema = yup.object().shape({
  sponsor_image: yup
    .mixed()
    .nullable()
    .test("required", "Image is required", (value) => {
      return value !== null;
    }),
  ad_title: yup.string().required("Ads title is required"),
  message: yup.string().required("message is required"),
  button_link: yup
    .string()
    .url("Your URL must start with http:// or https://")
    .optional(),
});

export type AdContentForm = yup.InferType<typeof AdContentSchema>;
export type BudgetDurationForm = yup.InferType<typeof BudgetDurationSchema>;
export type TargetAudienceForm = yup.InferType<typeof TargetAudienceSchema>;
export type SponsorListingForm = yup.InferType<typeof SponsorListingSchema>;
export type EmailCampaignForm = yup.InferType<typeof EmailCampaignSchema>;
