import * as yup from "yup";

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

// Schema for creating an event
export const EventStepOneSchema = yup.object().shape({
  event_banner: yup.string().required("This field is required"),
  event_thumbnail: yup.string().required("This field is required"),
  event_name: yup.string().required("Please enter event name"),
  event_description: yup.string().required("Please enter event description"),
});

export const EventStepThreeSchema = yup.object().shape({
  start_date: yup.date().required("Add date event will start"),
  start_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .required("Add time event will start"),
  end_date: yup.date().required("Add date event will end"),
  end_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .required("Add time event will end"),
    timezone: yup.string()
});


export const PhysicalLocationSchema = yup.object().shape({
  address: yup.string().required("Valid address is required"),
  city: yup.string().required('select city'),
  state: yup.string().required('enter state'),
  country: yup.string().required('enter country of event'),
  zipcode: yup.number().optional()
});

export const OnlineVenueLinkSchema = yup.object().shape({
  venue_link: yup.string().required('venue link is required'),
  venue_platform: yup.string().url('online link must be valid').required('Add online link')
})


export type OnlineVenueLink = yup.InferType<typeof OnlineVenueLinkSchema>;
export type PhysicalLocation = yup.InferType<typeof PhysicalLocationSchema>;
export type EventStepThree = yup.InferType<typeof EventStepThreeSchema>;
export type EventStepOne = yup.InferType<typeof EventStepOneSchema>;
