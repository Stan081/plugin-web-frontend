import React from "react";
import Image from "next/image";
import { Section } from "@/tw-components/Section";

const TicketManagement = () => {
  return (
    <Section className="w-full trapezium-reverse-container bg-[#211913]">
      <div className=" trapezium-reverse size-full bg-[#FFF1F0] flex flex-col justify-center">
        <div className="text-center space-y-3 py-20 w-[70%] mx-auto">
          <h2 className="font-pally-medium text-4xl leading-10 text-[#020912] w-[60%] mx-auto">
            Effortless Ticket Management and Real-Time Insights
          </h2>
          <p className="font-pally-regular text-base text-[#475367] w-[60%] mx-auto">
            Track sales, check in attendees, and monitor event progress using
            Plugin’s powerful ticket management tools.
          </p>
        </div>
        <figure className="relative w-[80%] mx-auto h-[90vh]">
          <Image
            fill={true}
            src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730124769/pricing-images/ticket-mgt.png"
            alt="Ticket Management"
            className="object-contain object-to"
          />
        </figure>
      </div>
    </Section>
  );
};

export default TicketManagement;
