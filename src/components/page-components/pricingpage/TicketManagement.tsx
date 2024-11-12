import React from "react";
import Image from "next/image";
import { Section } from "@/tw-components/Section";

const TicketManagement = () => {
  return (
    <Section className="w-full">
      <div className="size-full bg-custom-gradient flex py-20 xs:max-md:py-10 space-y-10 xs:max-md:space-y-5 flex-col justify-center">
        <div className="text-center space-y-3 w-[70%] xs:max-md:w-full mx-auto">
          <h2 className="capitalize font-pally-medium text-4xl xs:max-md:text-3xl leading-10 text-[#020912] w-[35rem] xs:max-md:w-[90%] mx-auto">
            Effortless Ticket Management and Real-Time Insights
          </h2>
          <p className="font-pally-regular text-base text-[#475367] w-[60%] mx-auto">
            Track sales, check in attendees, and monitor event progress using
            Plugin’s powerful ticket management tools.
          </p>
        </div>
        <figure className="relative w-[80%] xs:max-md:w-[95%] mx-auto h-[90vh] max-h-[30rem] xs:max-md:h-[40vh] flex items-center justify-center">
          <Image
            fill={true}
            src="https://res.cloudinary.com/dbhbyikta/image/upload/v1731397991/pricing-images/ticket-sales.png"
            alt="Ticket Management"
            className="object-contain object-to"
          />
        </figure>
      </div>
    </Section>
  );
};

export default TicketManagement;
