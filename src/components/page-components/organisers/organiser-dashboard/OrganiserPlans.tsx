import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toFiat } from "@/lib/amount";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import adPackagesData from "@/static-datas/ad-packages-data";
import Container from "@/tw-components/container";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface PlanFeature {
  id?: number;
  isAd: boolean;
  title: string;
  description?: string;
  bgColor: string;
  data: string[];
  pricing?: number;
}

function AdBanner({ details }: { details: PlanFeature }) {
  const {
    clickedCampaignId,
    handleIsChecked,
    nextSetUpStep,
    setClickedCampaignId,
  } = useOrganiserDashContext();

  const router = useRouter();

  const handleClick = (id: number) => {
    setClickedCampaignId(id);
    handleIsChecked("campaignTypeState");
    nextSetUpStep();
    router.push("/organiser/ad-campaigns/set-up");
  };
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

      <Button
        onClick={() => handleClick(details.id)}
        variant="outline"
        className=" border-[#D9302A] text-[#D9302A]"
      >
        Choose Plan
      </Button>
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

const OrganiserPlans = () => {
  const [isOpen, setIsOpen] = useState<string>("");

  function openAccordion(title: string) {
    if (isOpen === title) {
      setIsOpen("");
    } else {
      setIsOpen(title);
    }
  }
  return (
    <Container>
      <div className="mb-10 xs:max-md:hidden mt-10 w-[90%] max-w-[1000px] mx-auto flex">
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
                      className="h-14 text-center flex items-center justify-center text-sm md:text-base font-pally-medium text-[#1D2739] even:border-y border-[#483D4A]"
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
      <div className="hidden xs:max-md:block mx-auto">
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
    </Container>
  );
};

export default OrganiserPlans;
