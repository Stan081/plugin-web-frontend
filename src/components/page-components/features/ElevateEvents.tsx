import { Button } from "@/components/ui/button";
import React from "react";
import { Section } from "@/tw-components/Section";
import Image from "next/image";
import reasonsData from "@/static-datas/reasons-data";

const ElevateEvents = () => {
  return (
    <Section className="flex xs:max-md:flex-col-reverse justify-center gap-20 xs:max-md:gap-10 w-[90%] mx-auto py-20">
      <div className="flex items-center xs:max-md:gap-5 justify-between">
        {[1, 2, 3].map((banner) => {
          return (
            <div
              key={banner}
              className={`${
                banner === 1 && "relative rounded-2xl overflow-hidden"
              } ${banner === 2 && "relative mt-20 rounded-2xl overflow-hidden"} ${
                banner === 3 && "-mt-20 relative rounded-2xl overflow-hidden"
              }   h-[60vh] w-[10vw] ml-5 xs:max-md:ml-0 min-w-[120px] xs:max-md:min-w-fit xs:max-md:w-[33%] xs:max-md:h-[30rem]`}
            >
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
          );
        })}
      </div>
      <div className="w-1/2 xs:max-md:w-full flex items-center">
        <div className="space-y-8 xs:max-md:space-y-5">
          <h2 className="font-pally-medium text-4xl text-[#020912]">
            Elevate Your Event
            <br /> Management With Ease?
          </h2>
          <p className="font-pally-regular text-base 2xl:text-xl text-[#212121]">
            Our user-friendly software selects event listings based on your
            location or top priorities, making your search much more fun.
          </p>
          <div className="flex flex-wrap gap-5 xs:max-md:gap-y-3">
            {reasonsData.map((reason) => {
              return (
                <div key={reason.text} className="flex gap-1">
                  <figure className="size-8 min-w-8 bg-red-300 rounded-full"></figure>
                  <p className="font-pally-regular text-base text-[#212121] text-wrap 2xl:text-xl">
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
