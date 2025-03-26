"use client";

import { Button } from "@/components/ui/button";
import Container from "@/tw-components/container";
import React from "react";
import Image from "next/image";

const WhatWeOffter = () => {
  return (
    <div className="bg-whiteNoise">
      <Container className="py-8 px-4 md:py-20 md:px-0">
        <h2 className="text-3xl font-pally-medium text-center destructive">
          WHAT WE OFFER
        </h2>
        <ul className="mt-7 md:mt-12 flex flex-col md:flex-row justify-center gap-4 md:gap-8">
          <li className="bg-pitchNoise rounded-lg h-[550px] w-full lg:w-1/2 md:h-[640px]">
            <div className="p-5 md:pt-10 md:px-12 space-y-4">
              <h3 className="font-pally-medium text-3xl">For Organizers</h3>
              <p className="font-pally-regular text-[#586170] text-base md:text-lg">
                Our user-friendly software selects event listings based on your
                location or top priorities, making your search much more fun.
              </p>
              <Button variant="outline">Learn more</Button>
            </div>
            <div className="mx-auto max-w-xl">
              <Image
                src={"/images/for-organiser.svg"}
                width={562}
                height={312}
                alt="organiser lists"
                className="pointer-events-none w-full h-full"
              />
            </div>
          </li>
          <li className="bg-[#231B15] rounded-lg w-full lg:w-1/2 h-[550px] md:h-[640px]">
            <div className="p-5 md:pt-10 md:px-12 space-y-4">
              <h3 className="font-pally-medium text-3xl text-white">
              For Attendees
              </h3>
              <p className="font-pally-regular text-base md:text-lg text-white">
              Narrow your search to events that fuels your passion, from concerts, festivals, sports and gaming, exhibitions, picnics, conferences and lots more, you’re one click away as you enjoy a seamless process to having a great experince.
              </p>
              <Button
                variant="outline"
                className="border-white text-white font-pally-regular"
              >
                Learn more
              </Button>
            </div>
            <div className="mx-auto max-w-xl">
              <Image
                src={"/images/for-attendee.svg"}
                width={562}
                height={312}
                alt="organiser lists"
                className=" pointer-events-none w-full h-full"
              />
            </div>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default WhatWeOffter;
