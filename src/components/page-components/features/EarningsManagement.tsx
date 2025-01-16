import React from "react";
import { Section } from "@/tw-components/Section";
import Image from "next/image";

const EarningsManagement = () => {
  return (
    <Section className=" xs:max-md:h-auto w-full">
      <div className="size-full bg-[#211913] flex flex-col justify-center">
        <div className="text-center space-y-3 py-20 xs:max-md:py-10 w-[50%] xs:max-md:w-[90%] mx-auto">
          <h2 className="font-pally-medium text-4xl leading-10 text-white w-[60%] xs:max-md:w-full mx-auto">
            Earnings Management
          </h2>
          <p className="font-pally-regular text-base 2xl:text-xl text-white">
            Keep track of your earnings across all events. Monitor your total
            revenue, pending payouts, and trigger withdrawals with ease.
          </p>
        </div>
        <div className="relative pb-[10%] w-[80%] xs:max-md:w-[90%] mx-auto h-full">
          <figure className="relative xs:max-md:h-auto w-[60%] xs:max-md:max-w-[500px] xs:max-md:mx-auto aspect-[1/0.7] xs:max-md:w-full">
            <figure className="absolute xs:max-md:hidden -bottom-[10%] xs:max-md:top-[120%] h-[50%] left-[90%] xs:max-md:relative xs:max-md:mt-5 z-10 xs:max-md:left-0 w-[70%] aspect-[1/0.4 xs:max-md:w-full xs:max-md:h-[20vh]">
              <Image
                fill={true}
                src="https://res.cloudinary.com/dbhbyikta/image/upload/v1731569273/features-images/stat-card.png"
                alt="Withdraw Summary"
                className="object-contain object-left-bottom xs:max-md:object-top"
              />
            </figure>
            <Image
              fill={true}
              src="https://res.cloudinary.com/dbhbyikta/image/upload/v1731569135/features-images/withdraw-summary.png"
              alt="Withdraw Summary"
              className="object-contain xs:max-md:object-center object-right-bottom"
            />
          </figure>
          <figure className="hidden xs:max-md:w-[500px] absolute xs:max-md:block -bottom-[10%] xs:max-md:top-[120%] h-[50%] left-[90%] xs:max-md:relative xs:max-md:mt-5 z-10 xs:max-md:left-0 w-[70%] xs:max-md:max-w-full aspect-[1/0.4] xs:max-md:mx-auto xs:max-md:h-[20vh]">
              <Image
                fill={true}
                src="https://res.cloudinary.com/dbhbyikta/image/upload/v1731569273/features-images/stat-card.png"
                alt="Withdraw Summary"
                className="object-contain object-left-bottom xs:max-md:object-top"
              />
            </figure>
        </div>
      </div>
    </Section>
  );
};

export default EarningsManagement;
