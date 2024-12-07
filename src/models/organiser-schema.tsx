import * as yup from "yup";

export const BankAccountSchema = yup.object().shape({
  bank_name: yup.string().required("Select bank by name"),
  account_number: yup.number().truncate().positive('account must be positive whole number').required("This field is required"),
  account_name: yup.string().required(),
});

export type BankAccountForm = yup.InferType<typeof BankAccountSchema>;

