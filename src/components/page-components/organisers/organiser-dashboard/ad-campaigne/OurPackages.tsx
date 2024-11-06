import Container from "@/tw-components/container";
import React from "react";
import OrganiserPlans from "../OrganiserPlans";

const OurPackages = () => {
  return (
    <Container className="py-12 space-y-8">
      <div className="mx-auto space-y-3 flex flex-col items-center">
        <h2 className="text-[#475367] text-center font-pally-medium text-3xl">
          Get More Attendees with Our Ad Packages!
        </h2>
        <p className="text-base font-pally-regular md:text-lg text-center max-w-lg w-full text-[#667185]">
          Choose from our Basic, Pro, or Premium plans to target audiences and
          drive more ticket sales.
        </p>
      </div>

      <OrganiserPlans />
    </Container>
  );
};

export default OurPackages;
