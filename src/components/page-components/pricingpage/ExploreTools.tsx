import React from "react";
import Image from "next/image";
import { Section } from "@/tw-components/Section";

const ExploreTools = () => {
  return (
    <Section className="bg-[#211913] py-20">
      <h2 className="font-pally-medium text-4xl text-center text-white">
        Explore Tools To Host And
        <br />
        Manage Your Event
      </h2>
      <div className="mt-20 w-[80%] h-[95vh] mx-auto flex gap-5 ">
        <div className="relative w-1/2 h-full bg-[#FFF1F0] rounded-lg">
          <div className="p-5 ">
            <p className="font-pally-medium text-3xl text-[#020912]">
              Free/Paid Events Listing
            </p>
            <p className="font-pally-regular text-lg text-[#586170]">
              List your events on our platform at no cost, whether they’re
              ticketed or free, and reach a wider audience
            </p>
          </div>

          <div className="relative w-full">
            <figure className="absolute w-full h-60">
              <Image
                fill={true}
                src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730126958/pricing-images/party-2.png"
                alt="Party Banner 1"
                className="object-cover"
              />
            </figure>
          </div>

          <div className="relative w-full">
            <figure className="absolute top-8 w-full h-60">
              <Image
                fill={true}
                src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730126958/pricing-images/party-2.png"
                alt="Party Banner 1"
                className="object-cover"
              />
            </figure>
          </div>

          <div className="relative w-full">
            <figure className="absolute top-[25vh] w-full h-40">
              <Image
                fill={true}
                src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730126489/pricing-images/party-3.png"
                alt="Party Banner 2"
                className="object-cover"
              />
            </figure>
          </div>

          {/* crowd*/}
          <figure className="absolute bottom-0 w-full h-[55%] ">
            <Image
              fill={true}
              alt="Crowd"
              src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730109316/pricing-images/crowd.png"
              className="object-cover object-top rounded-b-lg"
            />
          </figure>
        </div>
        <div className="w-1/2 h-full flex flex-col gap-5">
          <div className="relative w-full h-1/2 bg-[#ECF2FE] rounded-lg">
            <div className="p-5 ">
              <p className="font-pally-medium text-3xl text-[#020912]">
                Private Events
              </p>
              <p className="font-pally-regular text-lg text-[#586170]">
                Host exclusive events by sending personalized invitations,
                keeping your event accessible to a select group
              </p>
            </div>
            <div className="absolute w-full bottom-0 h-1/2">
              <figure className="size-full">
                <Image
                  fill={true}
                  src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730127651/pricing-images/party-balloons.png"
                  alt="Party Balloons"
                  className="object-cover top-0"
                />
              </figure>
              <figure className="absolute left-1/3 bottom-0 h-[120%] w-1/3">
                <Image
                  fill={true}
                  src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730128429/pricing-images/padlock.png"
                  alt="Padlock"
                  className="object-contain"
                />
              </figure>
            </div>
          </div>
          <div className="relative w-full h-1/2 bg-[#FBF1E1] rounded-lg overflow-hidden">
            <div className="p-5 ">
              <p className="font-pally-medium text-3xl text-[#020912]">
                Recurring Events
              </p>
              <p className="font-pally-regular text-lg text-[#586170]">
                Easily manage events that repeat weekly, monthly, or at custom
                intervals with our recurring event setup feature
              </p>
            </div>
            <div className="half-trapezium absolute w-full h-[25%] bottom-0 bg-[#EFC8C5]"></div>
            <figure className="absolute w-1/2 h-1/2 bottom-0 left-[15%]">
              <Image
                fill={true}
                src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730129337/pricing-images/calendar.png"
                alt="Calendar"
                className="object-cover"
              />
            </figure>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ExploreTools;
