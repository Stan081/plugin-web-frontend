import React from "react";
import { Section } from "@/tw-components/Section";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const HeroSection = () => {
  const { handleProtectedNavigation } = useAuthRedirect();
  return (
    <Section className="relative overflow-hidden lg:h-[calc(100vh-4rem)] xs:max-md:flex xs:max-md:h-auto xs:max-md:flex-col-reverse w-full bg-[#211913] ">
      {/* responsiple for the absolute slant card image */}
      <figure className="relative size-full xs:max-md:w-full xs:max-md:h-[40vh] ">
        <Image
          fill={true}
          src="https://res.cloudinary.com/dbhbyikta/image/upload/v1743106687/plugin_ft_page_ghdzhr.png"
          alt="logo"
          className="object-cover object-bottom  xs:max-md:object-cover xs:max-md:object-right-top"
        />
      </figure>

      {/* controlling the "top "and "left" position alters the position of absolute text */}
      <div className="absolute xs:max-md:mt-5 xs:max-md:pl-5 xs:max-md:pr-10 xs:max-md:relative xs:max-md:top-10 xs:max-md:left-0 top-[20vh] left-28 z-10 w-[33%] min-w-[500px] xs:max-md:max-w-[250px] xs:max-md:min-w-auto xs:max-md:w-[30%] space-y-5 xs:max-md:space-y-4">
        <h1 className="font-pally-medium text-4xl xs:max-md:text-3xl text-white tracking-wider xs:max-md:w-[70%]">
          Take Full Control of Your Events with Plugin
        </h1>
        <p className="font-pally-regular text-xl xs:max-md:text-lg xs:max-md:w-[70%] text-white">
          Track, manage, and promote all your events easily with the Plugin
          Web-app
        </p>
        <div className="w-40 xs:max-md:w-28">
          <Button
            onClick={() => handleProtectedNavigation("/create-event")}
            variant="destructive"
            size="lg"
            className="mt-5 w-full py-3"
          >
            Get Started
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
