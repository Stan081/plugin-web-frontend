import { Button } from "@/components/ui/button";
import Container from "@/tw-components/container";
import Image from "next/image";
import React from "react";

const CampaignHeader = () => {
  return (
    <div className="bg-bgCampaignHeader bg-no-repeat pt-20 bg-cover">
      <Container className="flex items-end justify-between px-0 lg:px-12">
        <div className="max-w-xl space-y-6 pb-20">
          <h1 className="text-4xl font-pally-medium">
            Reach the right people with Plugin Campaign Plans
          </h1>
          <p className="text-[#1D2739] text-sm md:text-lg">
            Choose from a range of tailored ad packages designed to help you
            reach your audience.
          </p>

          <Button variant="destructive">Start Ad-Campaign</Button>
        </div>
        <div className="max-w-xl hidden h-[300px] lg:flex flex-col items-end">
          <Image
            src={"/images/crowd.png"}
            width={1124}
            height={421}
            alt="crowd"
            className="pointer-events-none object-cover w-full h-full"
          />
        </div>
      </Container>
    </div>
  );
};

export default CampaignHeader;
