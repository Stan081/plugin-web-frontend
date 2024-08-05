import * as yup from "yup";

// Schema for search field
export const SearchFieldSchema = yup.object().shape({
  event_name: yup.string(),
  event_location: yup.string(),
});

export type SearchFields = yup.InferType<
  typeof SearchFieldSchema
>
