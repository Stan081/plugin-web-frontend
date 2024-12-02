import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import Image from "next/image";
import React, { useState } from "react";
import { HiMiniSquare3Stack3D } from "react-icons/hi2";

type campaignPlansType = {
  id: number;
  title: string;
  description: string;
  image: string;
  bgColor: string;
  price: number;
};

export const campaignPlans: campaignPlansType[] = [
  {
    id: 1,
    title: "Social Media Ads",
    description: "( Facebook & Instagram )",
    image: "/images/social-media@2x.png",
    bgColor: "#ECF1F8",
    price: 8000,
  },
  {
    id: 2,
    title: "Email Campaigns",
    description: "( Ads to 5000 email list )",
    image: "/images/letter.png",
    bgColor: "#E7F6EC",
    price: 27000,
  },
  {
    id: 3,
    title: "Sponsored Listings",
    description: "( Highlight on Homepage )",
    image: "/images/Seo-ads-google.png",
    bgColor: "#FFF7AB",
    price: 10000,
  },
];

const CampaignType = () => {
  const { isClickedCampaign, handleIsChecked, nextSetUpStep, setIsClickedCampaign } = useOrganiserDashContext();

  const handleClick = (id: number) => {
    const getClicked = campaignPlans.find((plan) => plan.id === id);
    setIsClickedCampaign(getClicked.id);
  };

  const handleNext = () => {
    handleIsChecked("campaignTypeState");
    nextSetUpStep();
  };
  return (
    <div className="w-full md:w-3/5 p-10 rounded-lg h-screen bg-white flex flex-col justify-between">
      <div>
        <div className="space-y-4">
          <h2 className="text-4xl font-pally-medium">Start a Campaign</h2>
          <p className="text-[#475367] font-pally-regular text-lg">
            What type of campaign do you want to create
          </p>
          <Separator />
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 p-4 border border-[#bfc0c3] bg-[#eceef1] rounded-lg">
            <HiMiniSquare3Stack3D size={20} />
            <p className="font-pally-regular text-[#667185] text-base">
              You only have access to campaigns available on your plan
            </p>
          </div>
        </div>

        <ul className="mt-6 flex flex-col md:flex-row justify-center gap-5">
          {campaignPlans.map((plan) => (
            <li
              key={plan.id}
              onClick={() => handleClick(plan.id)}
              className={`${
                isClickedCampaign === plan.id && `border-4 border-black`
              } border p-3 rounded-xl cursor-pointer hover:border-[#475367] w-full max-w-md`}
            >
              <div
                style={{ backgroundColor: plan.bgColor }}
                className="border rounded-md py-8 px-10 h-32"
              >
                <Image
                  src={plan.image}
                  width={88}
                  height={57}
                  alt={plan.title}
                  className=" pointer-events-none w-full h-full object-contain"
                />
              </div>
              <div className="mt-4">
                <p className="font-pally-medium text-base md:text-lg text-[#475367]">
                  {plan.title}
                </p>
                <p className="font-pally-regular text-sm md:text-base text-[#475367]">
                  {plan.description}
                </p>
              </div>
              <p className="font-pally-medium text-base md:text-lg mt-5">
                {toFiat(plan.price)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Separator />
        <div className="mt-5 flex justify-end ">
          <Button
            onClick={handleNext}
            disabled={!isClickedCampaign}
            variant="destructive"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignType;
