import * as yup from "yup";

export const EmailCampaignSchema = yup.object().shape({
  campaign_image: yup
    .mixed()
    .nullable()
    .test("required", "Image is required", (value) => {
      return value !== null;
    }),
  campaign_name: yup.string().required(),
  sender_name: yup.string().required(),
  email_subject: yup.string().required(),
  message: yup.string().optional(),
});

export type EmailCampaignForm = yup.InferType<typeof EmailCampaignSchema>;
