import Faq from "@/components/faq";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import adPackagesData from "@/static-datas/ad-packages-data";
import benefitsData from "@/static-datas/benefits-data";
import ticketingFeesData from "@/static-datas/ticketing-fees-data";
import { Section } from "@/tw-components/Section";
import Image from "next/image";
import React from "react";

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
      className={`p-5 ${details.bgColor}  bg-none size-full flex flex-col justify-between`}
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

const Pricing = () => {
  return (
    <Layout title="Plugin | Pricing Page" showHeader showFooter>
      <Section className="pt-20">
        <div className="space-y-5">
          <h1 className="font-pally-medium text-4xl text-center">
            Transparent Pricing for Event Organizers
            <br /> No Hidden Fees
          </h1>
          <p className="font-pally-regular text-xl text-center text-[#475367]">
            <q>We charge a 10% commission per paid ticket sold, nothing else</q>
          </p>
        </div>
        <figure className="relative mt-20 w-[80%] mx-auto h-[70vh]">
          <figure className="absolute -top-28 -left-8 z-10 size-60">
            <Image
              fill={true}
              src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730107923/pricing-images/megaphone.png"
              alt="Studio Display"
              className="object-cover"
            />
          </figure>
          <Image
            fill={true}
            src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730091766/pricing-images/studio-display.png"
            alt="Studio Display"
            className="object-cover rounded-t-xl"
          />
        </figure>
      </Section>

      <Section className="flex justify-center gap-32 w-[80%] mx-auto py-40">
        <div className="flex items-center">
          <figure className="relative size-[25rem]">
            <Image
              fill={true}
              src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730119374/pricing-images/pie-chart.png"
              alt="Pie Chart"
              className="object-contain"
            />
          </figure>
        </div>
        <div className="w-1/2 flex items-center">
          <div className="space-y-8">
            <h2 className="font-pally-medium text-4xl text-[#020912]">
              Simple And Transparent
              <br /> Ticketing Fees
            </h2>
            <p className="font-pally-regular text-base text-[#212121]">
              Plugin ensures smooth ticketing with a transparent 10% commission
              on paid tickets, while free tickets come at no cost to you,
            </p>
            <div className="flex flex-wrap justify-between gap-y-5">
              {ticketingFeesData.map((data) => {
                return (
                  <div key={data.text} className="flex gap-2 w-1/2">
                    <figure className="size-8 bg-black rounded-full"></figure>
                    <p className="font-pally-regular text-base text-[#212121] text-wrap">
                      {data.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[#211913] py-20">
        <h2 className="font-pally-medium text-4xl text-center text-white">
          Explore Tools To Host And
          <br />
          Manage Your Event
        </h2>
        <div className="mt-20 w-[80%] h-[90vh] mx-auto flex gap-5 ">
          <div className="relative w-1/2 h-full bg-[#FFF1F0] rounded-lg">
            <div className="p-10 ">
              <p className="font-pally-medium text-3xl text-[#020912]">
                Free/Paid Events Listing
              </p>
              <p className="font-pally-regular text-lg text-[#586170]">
                List your events on our platform at no cost, whether they’re
                ticketed or free, and reach a wider audience
              </p>
            </div>
            <figure className="absolute w-full h-1/2 bg-sky-500"></figure>
            <figure className="absolute bottom-0 w-full h-1/2 bg-green-500 bg-opacity-50">
              <Image
                fill={true}
                alt="Crowd"
                src="https://res.cloudinary.com/dbhbyikta/image/upload/v1730109316/pricing-images/crowd.png"
                className="object-fill"
              />
            </figure>
          </div>
          <div className="w-1/2 h-full flex flex-col gap-5">
            <div className="w-full h-1/2 bg-green-500 rounded-lg"></div>
            <div className="w-full h-1/2 bg-green-500 rounded-lg"></div>
          </div>
        </div>
      </Section>

      <Section className="bg-whiteNoise py-40">
        <div className="w-[80%] mx-auto space-y-28">
          {benefitsData.map((benefits) => {
            return (
              <div
                key={benefits.title}
                className="flex even:flex-row-reverse gap-24 "
              >
                <div className="w-[40%] space-y-5">
                  <h2 className="font-pally-medium text-4xl text-[#020912]">
                    {benefits.title}
                  </h2>
                  <p className="font-pally-regular text-lg text-[#475367]">
                    {benefits.body}
                  </p>
                </div>
                <div
                  className={`${benefits.bgColor} relative w-[60%] h-[60vh] `}
                >
                  <Image
                    fill={true}
                    src={benefits.imageURL}
                    alt="Studio Display"
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Section>

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

      <Faq />
    </Layout>
  );
};

export default Pricing;
