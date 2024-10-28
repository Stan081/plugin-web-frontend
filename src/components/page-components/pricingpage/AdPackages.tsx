import React from "react";
import { Section } from "@/tw-components/Section";
import adPackagesData from "@/static-datas/ad-packages-data";
import { Button } from "@/components/ui/button";

type Details =
  | {
      isAd: boolean;
      title: string;
      description: string;
      bgColor: string;
      data: string[];
      pricing?: string;
      link?: string;
    }
  | {
      isAd: boolean;
      title: string;
      pricing: string;
      link: string;
      bgColor: string;
      data: string[];
      description?: string;
    };

function AdBanner({ details }: { details: Details }) {
  return (
    <div
      className={`p-5 ${details.title === "Social Media Ads" && "bg-[#C7DFFE]"} ${details.title === "Email Campaigns" && "bg-[#FCE0EB]"} ${details.title === "Sponsored Listings" && "bg-[#ECD7F8]"}  bg-none size-full flex flex-col justify-between`}
    >
      <div className="space-y-1">
        <p className="font-pally-medium text-2xl text-[#344054]">
          {details.title}
        </p>
        <p className="font-pally-bold text-3xl text-[#221D22]">
          {details.pricing}
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
    <div
      className={`bg-[#281E17] p-5 size-full flex flex-col justify-center gap-[20%]`}
    >
      <p className="font-pally-bold text-2xl text-white">All Pricing Plans</p>
      <p className="font-pally-regular text-base text-[#BDB2BD]">
        Compare all pricing offers suitable for your Individual, team and
        enterprise needs
      </p>
    </div>
  );
}

const AdPackages = () => {
  return (
    <Section className="bg-whiteNoise py-20">
      <div className="space-y-2">
        <h2 className="font-pally-medium text-4xl text-center text-[#020912]">
          Get More Attendees With Our Ad Packages!
        </h2>
        <p className="font-pally-regular text-lg text-center text-[#475367] w-1/2 mx-auto">
          Choose from our Basic, Pro, or Premium plans to target audiences and
          drive more ticket sales.
        </p>
      </div>
      <div className="mt-10 w-[80%] mx-auto flex">
        {adPackagesData.map((ad) => {
          return (
            <div key={ad.title} className="group w-1/4 box-border">
              <div
                className={`group-first:rounded-l-xl group-last:rounded-r-xl group-first:border-l group-last:border-r  w-full h-[30vh] overflow-hidden border-y border-[rgba(72,61,74,0.1)]`}
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
    </Section>
  );
};

export default AdPackages;
