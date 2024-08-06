"use client";

import Container from "@/tw-components/container";
import Image from "next/image";
import React from "react";

const AboutHero = () => {
  return (
    <div className="bg-pitchNoise">
      <Container className="pt-8 px-4 md:pt-20 md:px-0">
        <div className="w-full max-w-3xl mx-auto space-y-5">
          <h1 className="text-center font-pally-medium md:font-pally-bold text-3xl md:text-5xl mx-auto">
            We're revolutionizing how people discover and attend events.
          </h1>
          <p className="mx-auto font-pally-regular text-base md:text-lg text-[#586170] text-center md:max-w-xl">
            Whether it's a concert, conference, or local gathering, Plugin
            offers the essential tools for your event's success.
          </p>
        </div>
        <div className="h-4/5 mt-6 md:mt-16 md:mx-20">
          <Image
            src={
              "https://ik.imagekit.io/pluginImage/Plugin-images/about-image.jpeg?updatedAt=1722631539754"
            }
            alt="About-us"
            width={1226}
            height={609}
            className=" pointer-events-none w-full h-full rounded-tl-3xl rounded-tr-3xl"
          />
        </div>
      </Container>
    </div>
  );
};

export default AboutHero;
