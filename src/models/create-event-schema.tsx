import { off } from "process";
import * as yup from "yup";

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

// Schema for creating an event
export const EventStepOneSchema = yup.object().shape({
  event_banner: yup
    .mixed()
    .nullable()
    .test("required", "Image is required", (value) => {
      return value !== null;
    }),
  event_thumbnail: yup
    .mixed()
    .nullable()
    .test("required", "Image is required", (value) => {
      return value !== null;
    }),
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
  zipcode: yup.number().truncate().positive().optional(),
});

export const OnlineVenueLinkSchema = yup.object().shape({
  venue_link: yup
    .string()
    .url("online link must be valid")
    .required("venue link is required"),
  venue_platform: yup.string().required("Add venue platform"),
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
  pass_price: yup
    .number()
    .truncate()
    .positive("Price must be a positive whole number")
    .required("Add price per pass"),
  pass_category: yup.array().of(yup.string().optional()),
  available_slot: yup.number().required("Add available slots"),
});

export const SlotWithHostSchema = yup.object().shape({
  host_thumbnail: yup.string().required("Please upload host image"),
  isHost: yup.boolean().optional(),
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
  isHost: yup.boolean().optional(),
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

export const PaidTicketFormSchema = yup.object().shape({
  ticket_type: yup.string().required(),
  ticket_name: yup.string().required("Ticket name is required"),
  ticket_quantity: yup
    .number()
    .truncate()
    .positive("Quantity must be a positive whole number")
    .required("Add ticket quantity to be sold"),
  ticket_price: yup
    .number()
    .truncate()
    .positive("Price must be a positive whole number")
    .required("Add ticket price per ticket"),
  start_date: yup.date().required("Add date ticket will start"),
  end_date: yup.date().required("Add date ticket will end"),
  start_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .optional(),
  end_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .optional(),
  ticket_perks: yup.string().required("Ticket perks is required"),
});

export const FreeTicketFormSchema = yup.object().shape({
  ticket_type: yup.string().required(),
  ticket_name: yup.string().required("Ticket name is required"),
  ticket_quantity: yup
    .number()
    .truncate()
    .positive("Quantity must be a positive whole number")
    .required("Add ticket quantity to be sold"),
  start_date: yup.date().required("Add date ticket will start"),
  end_date: yup.date().required("Add date ticket will end"),
  reservation: yup.string(),
  start_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .optional(),
  end_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .optional(),
  ticket_perks: yup.string().required("Ticket perks is required"),
});

export const DonationFormSchema = yup.object().shape({
  ticket_type: yup.string().required(),
  ticket_name: yup.string().required("Ticket name is required"),
  ticket_quantity: yup
    .number()
    .truncate()
    .positive("Quantity must be a positive whole number")
    .required("Add ticket quantity to be sold"),
  min_price: yup
    .number()
    .truncate()
    .positive("Minimum price must be a positive whole number")
    .required("Add ticket minimum price"),
  max_price: yup
    .number()
    .truncate()
    .positive("Maximum price must be a positive whole number")
    .required("Add ticket minimum price"),
  start_date: yup.date().required("Add date ticket will start"),
  end_date: yup.date().required("Add date ticket will end"),
  start_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .optional(),
  end_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .optional(),
  ticket_perks: yup.string().required("Ticket perks is required"),
});

export const PaidSeatSectionFormSchema = yup.object().shape({
  seat_type: yup.string().required(),
  ticket_type: yup.string().required(),
  ticket_name: yup.string().required("Ticket name is required"),
  ticket_quantity: yup
    .number()
    .truncate()
    .positive("Quantity must be a positive whole number")
    .required("Add ticket quantity to be sold"),
  ticket_category: yup.string().required("Select a category"),
  ticket_price: yup
    .number()
    .truncate()
    .positive("Price must be a positive whole number")
    .required("Add ticket price per ticket"),
  start_date: yup.date().required("Add date ticket will start"),
  end_date: yup.date().required("Add date ticket will end"),
  start_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .optional(),
  end_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .optional(),
  ticket_perks: yup.string().required("Ticket perks is required"),
  label_image: yup.string().optional(),
  label_color: yup.string().optional(),
});

export const FreeSeatSectionFormSchema = yup.object().shape({
  seat_type: yup.string().required(),
  ticket_type: yup.string().required(),
  ticket_name: yup.string().required("Ticket name is required"),
  ticket_quantity: yup
    .number()
    .truncate()
    .positive("Quantity must be a positive whole number")
    .required("Add ticket quantity to be sold"),
  ticket_category: yup.string().required("Select a category"),
  start_date: yup.date().required("Add date ticket will start"),
  end_date: yup.date().required("Add date ticket will end"),
  start_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .optional(),
  end_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .optional(),
  ticket_perks: yup.string().required("Ticket perks is required"),
  label_image: yup.string().optional(),
  label_color: yup.string().optional(),
});

const ScheduleForm = yup.object().shape({
  start_date: yup.date().required("Add date ticket will start"),
  start_time: yup
    .string()
    .matches(timeRegex, "Invalid time format (HH:MM)")
    .optional(),
});

export const InviteeListSchema = yup.object().shape({
  full_name: yup.string().required("Full name is required"),
  phone_number: yup.string().required("Contact phone number is required"),
  pass_code: yup.string().required("Generate passcode"),
});

const inviteeInformation = yup.object().shape({
  message: yup.string().required("Write message for invitees"),
  inviteeLists: yup.array().of(InviteeListSchema),
});

export const PublishFormSchema = yup.object().shape({
  organiser_photo: yup.string().required(),
  organiser_name: yup.string().required(),
  event_visibility: yup.string().required(),
  publishWhen: yup.boolean().required(),
  schedulePublish: yup.object().shape({
    start_date: yup.date().when("publishWhen", {
      is: false,
      then: (schema) => schema.required("Start date is required"),
      otherwise: (schema) => schema.optional(),
    }),
    start_time: yup.string().when("publishWhen", {
      is: false,
      then: (schema) => schema.required("Start time is required"),
      otherwise: (schema) => schema.optional(),
    }),
  }),
});

export type InviteeListForm = yup.InferType<typeof InviteeListSchema>;
export type PublishForm = yup.InferType<typeof PublishFormSchema>;
export type FreeSeatSection = yup.InferType<typeof FreeSeatSectionFormSchema>;
export type PaidSeatSection = yup.InferType<typeof PaidSeatSectionFormSchema>;
export type DonationForm = yup.InferType<typeof DonationFormSchema>;
export type FreeTicket = yup.InferType<typeof FreeTicketFormSchema>;
export type PaidTicket = yup.InferType<typeof PaidTicketFormSchema>;
export type SlotWithoutHostForm = yup.InferType<typeof SlotWithoutHostSchema>;
export type SlotWithHostForm = yup.InferType<typeof SlotWithHostSchema>;
export type VendorsForm = yup.InferType<typeof VendorFormSchema>;
export type EventGuest = yup.InferType<typeof EventGuestSchema>;
export type OnlineVenueLink = yup.InferType<typeof OnlineVenueLinkSchema>;
export type PhysicalLocation = yup.InferType<typeof PhysicalLocationSchema>;
export type OneTimeForm = yup.InferType<typeof OneTimeFormShema>;
export type RecurringForm = yup.InferType<typeof RecurringFormShema>;
export type EventStepOne = yup.InferType<typeof EventStepOneSchema>;
