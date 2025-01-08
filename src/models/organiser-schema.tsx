import * as yup from "yup";

export const BankAccountSchema = yup.object().shape({
  bank_code: yup.string().required("Select bank by name"),
  account_number: yup.string().required("This field is required"),
});

export type BankAccountForm = yup.InferType<typeof BankAccountSchema>;

