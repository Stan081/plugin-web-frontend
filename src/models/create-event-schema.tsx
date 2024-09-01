import * as yup from "yup";

// Schema for checkoutForm
export const EventStepOneSchema = yup.object().shape({
  event_banner: yup.string().required("This field is required"),
  event_thumbnail: yup.string().required("This field is required"),
  event_name: yup.string().required("Please enter event name"),
 event_description: yup.string().required("Please enter event description"),
});

export type EventStepOne = yup.InferType<typeof EventStepOneSchema>;
