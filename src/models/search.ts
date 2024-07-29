import * as yup from "yup";

// Schema for search field
export const SearchFieldSchema = yup.object().shape({
  eventName: yup.string().required("Please enter event name"),
});

export type SearchField = yup.InferType<
  typeof SearchFieldSchema
>
