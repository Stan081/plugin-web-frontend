import * as yup from "yup";

// Schema for search field
export const SearchFieldSchema = yup.object().shape({
  event_name: yup.string(),
  event_location: yup.string(),
});

// Schema for search saved events
export const SavedEventsSchema = yup.object().shape({
  event_name: yup.string(),
});

export type SavedEvents = yup.InferType<typeof SavedEventsSchema>

export type SearchFields = yup.InferType<
  typeof SearchFieldSchema
>
