import { Button } from "@/components/ui/button";
import React from "react";
import { Section } from "@/tw-components/Section";
import Image from "next/image";
import reasonsData from "@/static-datas/reasons-data";

const ElevateEvents = () => {
  return (
    <Section className="flex justify-center gap-20 w-[90%] mx-auto py-20">
      <div className="flex items-center gap-10">
        <div className="relative w-[10vw] h-[60vh] rounded-2xl overflow-hidden">
          <div className="absolute z-10 size-full bg-[#9747FF66]"></div>
          <figure className="relative size-full">
            <Image
              fill={true}
              src="https://res.cloudinary.com/dbhbyikta/image/upload/v1729618096/features-images/celebrate.png"
              alt="celebrate"
              className="object-cover object-center"
            />
          </figure>
        </div>
        <div className="mt-20 relative w-[10vw] h-[60vh] rounded-2xl overflow-hidden">
          <div className="absolute z-10 size-full bg-[#9747FF66]"></div>
          <figure className="relative size-full">
            <Image
              fill={true}
              src="https://res.cloudinary.com/dbhbyikta/image/upload/v1729618096/features-images/celebrate.png"
              alt="celebrate"
              className="object-cover object-center"
            />
          </figure>
        </div>
        <div className="-mt-20 relative w-[10vw] h-[60vh] rounded-2xl overflow-hidden">
          <div className="absolute z-10 size-full bg-[#9747FF66]"></div>
          <figure className="relative size-full">
            <Image
              fill={true}
              src="https://res.cloudinary.com/dbhbyikta/image/upload/v1729618096/features-images/celebrate.png"
              alt="celebrate"
              className="object-cover object-center"
            />
          </figure>
        </div>
      </div>
      <div className="w-1/2 flex items-center">
        <div className="space-y-8">
          <h2 className="font-pally-medium text-4xl text-[#020912]">
            Elevate Your Event
            <br /> Management With Ease?
          </h2>
          <p className="font-pally-regular text-base text-[#212121]">
            Our user-friendly software selects event listings based on your
            location or top priorities, making your search much more fun.
          </p>
          <div className="flex flex-wrap justify-between gap-y-5">
            {reasonsData.map((reason) => {
              return (
                <div key={reason.text} className="flex gap-1">
                  <figure className="size-8 bg-red-300 rounded-full"></figure>
                  <p className="font-pally-regular text-base text-[#212121] text-wrap">
                    {reason.text}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="w-40">
            <Button
              variant="destructive"
              size="lg"
              className="mt-5 w-full py-3"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ElevateEvents;
