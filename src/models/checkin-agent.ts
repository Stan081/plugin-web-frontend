import * as yup from "yup";

export const CheckinAgentSchema = yup.object().shape({
  agent_email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
  agent_ticket_type: yup.array().of(yup.string()).required("Select ticket type for agent"),
});


export type CheckinAgentForm = yup.InferType<typeof CheckinAgentSchema>;
