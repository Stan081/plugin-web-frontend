import React from "react";
import { Section } from "@/tw-components/Section";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <Section className="relative h-[calc(100vh-4rem)] w-full bg-[#211913] ">
        {/* responsiple for the absolute slant card image */}
      <figure className="relative size-full">
        <Image
          fill={true}
          src="https://res.cloudinary.com/dbhbyikta/image/upload/v1729595236/features-images/phwzzhfponbupyles13k.png"
          alt="logo"
          className="object-contain object-right"
        />
      </figure>

      {/* controlling the "top "and "left" position alters the position of absolute text */}
      <div className="absolute top-[20vh] left-28 z-10 w-[33%] space-y-5">
        <h1 className="font-pally-medium text-4xl text-white tracking-wider">
          Take Full Control of Your Events with Plugin
        </h1>
        <p className="font-pally-regular text-xl text-white">
          Track, manage, and promote all your events easily with the Plugin
          Web-app
        </p>
        <div className="w-40">
          <Button variant="destructive" size="lg" className="mt-5 w-full py-3">
            Get Started
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
