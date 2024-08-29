import * as yup from "yup";

// Schema for signup fields
export const SignupSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
  phone_number: yup.string().required("Contact phone number is required"),
});

// Schema for signup fields
export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
});

// Schema for checkoutForm
export const CheckoutFormSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
  isUpdated: yup.boolean(),
  isEmail: yup.boolean(),
});

export type SignupFields = yup.InferType<typeof SignupSchema>;

export type LoginFields = yup.InferType<typeof LoginSchema>;

export type CheckoutForms = yup.InferType<typeof CheckoutFormSchema>;
