import React, { useState } from "react";
import { Section } from "@/tw-components/Section";
import adPackagesData from "@/static-datas/ad-packages-data";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toFiat } from "@/lib/amount";

type Details =
  | {
      isAd: boolean;
      title: string;
      description: string;
      bgColor: string;
      data: string[];
      pricing?: number;
    }
  | {
      isAd: boolean;
      title: string;
      pricing: number;
      bgColor: string;
      data: string[];
      description?: string;
    };

function AdBanner({ details }: { details: Details }) {
  return (
    <div
      className={`p-5 ${
        details.title === "Social Media Ads" && "bg-[#C7DFFE]"
      } ${details.title === "Email Campaigns" && "bg-[#FCE0EB]"} ${
        details.title === "Sponsored Listings" && "bg-[#ECD7F8]"
      }  bg-none size-full flex flex-col justify-between`}
    >
      <div className="space-y-1">
        <p className="font-pally-medium text-2xl text-[#344054]">
          {details.title}
        </p>
        <p className="font-pally-bold text-3xl text-[#221D22]">
          {toFiat(details.pricing)}
        </p>
      </div>

      <div className="">
        <Button variant="outline" className=" border-[#D9302A] text-[#D9302A]">
          Choose Plan
        </Button>
      </div>
    </div>
  );
}

function PricingBanner() {
  return (
    <div className={`bg-[#281E17] p-5 size-full flex flex-col justify-center `}>
      <p className="font-pally-bold text-2xl text-white">All Pricing Plans</p>
      <p className="font-pally-regular leading-5 text-base text-[#BDB2BD]">
        Compare all pricing offers suitable for your Individual, team and
        enterprise needs
      </p>
    </div>
  );
}

const AdPackages = () => {
  const [isOpen, setIsOpen] = useState<string>("");

  function openAccordion(title: string) {
    if (isOpen === title) {
      setIsOpen("");
    } else {
      setIsOpen(title);
    }
  }

  return (
    // DESKTOP-FIRST STYLING
    <Section className=" bg-whiteNoise py-20 xs:max-md:space-y-10">
      <div className="space-y-2 xs:max-md:w-full xs:max-md:mx-auto">
        <h2 className="font-pally-medium text-4xl xs:max-md:text-3xl xs:max-md:w-[80%] xs:max-md:mx-auto text-center text-[#020912]">
          Get More Attendees With Our Ad Packages!
        </h2>
        <p className="font-pally-regular text-lg text-center text-[#475367] w-[26rem] xs:max-md:w-[90%] mx-auto">
          Choose from our Basic, Pro, or Premium plans to target audiences and
          drive more ticket sales.
        </p>
      </div>

      {/* FOR DESKTOP */}
      <div className=" xs:max-md:hidden mt-10 w-[90%] max-w-[1000px] mx-auto flex">
        {adPackagesData.map((ad) => {
          return (
            <div key={ad.title} className="group w-1/4 box-border">
              <div
                className={`group-first:rounded-l-xl group-last:rounded-r-xl group-first:border-l group-last:border-r w-full h-full max-h-[200px] overflow-hidden border-y border-[rgba(72,61,74,0.1)]`}
              >
                {ad.isAd ? <AdBanner details={ad} /> : <PricingBanner />}
              </div>
              <div
                className={`group-first:rounded-l-xl group-first:border-r-transparent group-last:rounded-r-xl group-last:border-r-[#483D4A]     mt-5 border border-r-transparent border-[#483D4A]`}
              >
                {ad.data.map((item) => {
                  return (
                    <p
                      key={item}
                      className="h-14 text-center flex items-center justify-center text-sm font-pally-medium text-[#1D2739] even:border-y border-[#483D4A]"
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOR MOBILE */}
      <div className="hidden xs:max-md:block w-[95%] mx-auto">
        <Accordion
          type="single"
          collapsible
          className="w-full md:w-3/5 mx-auto"
        >
          <ul className="space-y-4">
            {adPackagesData.slice(1).map((ad) => (
              <li key={ad.title}>
                <AccordionItem
                  value={ad.title as string}
                  className={`py-3 px-4 border-4 border- ${
                    isOpen === ad.title && " bg-[#F4F6F9]"
                  } rounded-2xl`}
                  onClick={() => openAccordion(ad.title)}
                >
                  <AccordionTrigger className=" font-pally-medium text-xl  text-[#344054] ">
                    <div className="flex items-end gap-2">
                      <div className="">
                        <input
                          checked={isOpen === ad.title}
                          type="checkbox"
                          className="size-4 accent-[#344054] rounded-lg"
                        />
                      </div>
                      <p className="">
                        {ad.title} - {toFiat(ad.pricing)}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className=" font-pally-regular text-base md:text-lg">
                    <p className="font-pally-regular text-[#667185] text-base leading-6">
                      This plan includes all the following perks below:{" "}
                    </p>
                    <ul className="list-inside list-disc ml-2 space-y-1 mt-2">
                      {ad.data[0].split(",").map((platform) => (
                        <li
                          key={platform}
                          className="font-pally-regular text-[#667185] text-sm md:text-base leading-6"
                        >
                          {platform}{" "}
                        </li>
                      ))}
                      <li className="font-pally-regular text-[#667185] text-sm md:text-base leading-6">
                        {ad.data[1]} impressions
                      </li>
                      <li className="font-pally-regular text-[#667185] text-sm md:text-base leading-6">
                        {ad.data[2]} runtime duration
                      </li>
                      <li className="font-pally-regular text-[#667185] text-sm md:text-base leading-6">
                        {ad.addOns}
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </li>
            ))}
          </ul>
        </Accordion>
      </div>
    </Section>
  );
};

export default AdPackages;
