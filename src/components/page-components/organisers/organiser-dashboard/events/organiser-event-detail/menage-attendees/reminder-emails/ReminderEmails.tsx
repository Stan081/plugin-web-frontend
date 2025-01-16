import { Section } from "@/tw-components/Section";
import React from "react";
import ReminderEmailsEmptyState from "./ReminderEmailsEmptyState";

const ReminderEmails = () => {
  return (
    <Section>
      <div>
        <p className="font-pally-regular text-base text-[#101928] pb-3 border-b border-[#E4E7EC]">
          Send custom reminder emails to attendees
        </p>
      </div>
      <div>
        <ReminderEmailsEmptyState />
      </div>
    </Section>
  );
};

export default ReminderEmails;
