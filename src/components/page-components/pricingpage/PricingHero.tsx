import React from "react";
import Image from "next/image";
import { Section } from "@/tw-components/Section";

const PricingHero = () => {
  return (
    <Section className="pt-20">
      <div className="space-y-5">
        <h1 className="font-pally-medium text-4xl text-center">
          Transparent Pricing for Event Organizers
          <br /> No Hidden Fees
        </h1>
        <p className="font-pally-regular text-xl text-center text-[#475367]">
          <q>We charge a 10% commission per paid ticket sold, nothing else</q>
        </p>
      </div>
      <figure className="relative mt-20 w-[80%] mx-auto h-[70vh]">
        <figure className="absolute -top-28 -left-8 z-10 size-60">
          <Image
            fill={true}
            src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730107923/pricing-images/megaphone.png"
            alt="Studio Display"
            className="object-cover"
          />
        </figure>
        <Image
          fill={true}
          src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730091766/pricing-images/studio-display.png"
          alt="Studio Display"
          className="object-cover rounded-t-xl"
        />
      </figure>
    </Section>
  );
};

export default PricingHero;
