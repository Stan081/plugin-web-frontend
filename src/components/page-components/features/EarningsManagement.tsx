import React from "react";
import { Section } from "@/tw-components/Section";
import Image from "next/image";

const EarningsManagement = () => {
  return (
    <Section className="h-screen w-full trapezium-reverse-container ">
      <div className=" trapezium-reverse size-full bg-[#211913] flex flex-col justify-center">
        <div className="text-center space-y-3 py-20 w-[50%] mx-auto">
          <h2 className="font-pally-medium text-4xl leading-10 text-white w-[60%] mx-auto">
            Earnings Management
          </h2>
          <p className="font-pally-regular text-base text-white">
            Keep track of your earnings across all events. Monitor your total
            revenue, pending payouts, and trigger withdrawals with ease.
          </p>
        </div>
        <figure className="relative w-[80%] mx-auto h-full">
          <Image
            fill={true}
            src="https://res.cloudinary.com/dbhbyikta/image/upload/v1729606556/features-images/plugin-earnings.png"
            alt="Plugin Earnings"
            className="object-contain object-top"
          />
        </figure>
      </div>
    </Section>
  );
};

export default EarningsManagement;
