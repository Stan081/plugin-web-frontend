import * as yup from "yup";

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

// Schema for creating an event
export const EventStepOneSchema = yup.object().shape({
  event_banner: yup.string().required("This field is required"),
  event_thumbnail: yup.string().required("This field is required"),
  event_name: yup.string().required("Please enter event name"),
  event_description: yup.string().required("Please enter event description"),
});

export const OneTimeFormShema = yup.object().shape({
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
  timezone: yup.string(),
});

export const RecurringFormShema = yup.object().shape({
  schedule: yup.string().required("Schedule recurring event"),
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
  timezone: yup.string(),
});

export const PhysicalLocationSchema = yup.object().shape({
  address: yup.string().required("Valid address is required"),
  city: yup.string().required("select city"),
  state: yup.string().required("enter state"),
  country: yup.string().required("enter country of event"),
  zipcode: yup.number().optional(),
});

export const OnlineVenueLinkSchema = yup.object().shape({
  venue_link: yup.string().required("venue link is required"),
  venue_platform: yup
    .string()
    .url("online link must be valid")
    .required("Add online link"),
});

// Define the individual guest schema
export const EventGuestSchema = yup.object().shape({
  guest_image: yup.string().required("Upload guest image"),
  guest_name: yup.string().required("This field is required"),
  guest_role: yup.string().optional(),
});

export const VendorFormSchema = yup.object().shape({
  pass_thumbnail: yup.string().optional(),
  shared_pass: yup.boolean().required(),
  pass_tag: yup.string().required("Vendor pass tag is required"),
  pass_price: yup.number().required("Add price per pass"),
  pass_category: yup.array().of(yup.string().optional()),
  available_slot: yup.number().required("Add available slots"),
});

export const SlotWithHostSchema = yup.object().shape({
  host_thumbnail: yup.string().required('Please upload host image'),
  isHost: yup.boolean().required(),
  host_name: yup.string().required("Host name is is required"),
  agenda_title: yup.string().required("Agenda title is required"),
  agenda_description: yup.string().optional(),
  start_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .required("Add time event will start"),
  end_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .required("Add time event will start"),
});

export const SlotWithoutHostSchema = yup.object().shape({
  isHost: yup.boolean().required(),
  agenda_title: yup.string().required("Agenda title is required"),
  agenda_description: yup.string().optional(),
  start_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .required("Add time event will start"),
  end_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .required("Add time event will start"),
});

export type SlotWithoutHostForm = yup.InferType<typeof SlotWithoutHostSchema>;
export type SlotWithHostForm = yup.InferType<typeof SlotWithHostSchema>;
export type VendorsForm = yup.InferType<typeof VendorFormSchema>;
export type EventGuest = yup.InferType<typeof EventGuestSchema>;
export type OnlineVenueLink = yup.InferType<typeof OnlineVenueLinkSchema>;
export type PhysicalLocation = yup.InferType<typeof PhysicalLocationSchema>;
export type OneTimeForm = yup.InferType<typeof OneTimeFormShema>;
export type RecurringForm = yup.InferType<typeof RecurringFormShema>;
export type EventStepOne = yup.InferType<typeof EventStepOneSchema>;
