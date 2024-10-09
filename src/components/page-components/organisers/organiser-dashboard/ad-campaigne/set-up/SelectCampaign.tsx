"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { toFiat } from "@/lib/amount";

type CheckedState = boolean | "checked" | "unchecked" | "indeterminate";

interface PlanFeature {
  id: number;
  name: string;
  platforms: string[];
  price: number;
  impression: string | number;
  targeting: string | number;
  duration: string;
  addOns: string;
  bgColor: string;
}

const features: PlanFeature[] = [
  {
    id: 1,
    name: "Basic Plan",
    price: 7000,
    platforms: ["Facebook", "Instagram"],
    impression: "1,000",
    targeting: "Basic (age, location, interests)",
    duration: "7 days",
    addOns: "+₦5,00 for 500 more impressions",
    bgColor: "#C7DFFE",
  },
  {
    id: 2,
    name: "Pro Plan",
    price: 27000,
    platforms: ["Facebook", "Instagram", "Twitter"],
    impression: "5,000",
    targeting: "Advanced (demographics, behavior",
    duration: "14 days",
    addOns: "+₦20,000 for 7 extra days",
    bgColor: "#FCE0EB",
  },
  {
    id: 3,
    name: "Premium Plan",
    price: 70000,
    platforms: ["All Social Media", "Google Ads", "Email"],
    impression: "15,000",
    targeting: "Comprehensive (custom audiences)",
    duration: "30 days",
    addOns: "+₦30,000 for high-priority placements",
    bgColor: "#ECD7F8",
  },
];

const SelectCampaign = () => {
  const { isChecked, handleIsChecked, nextSetUpStep } =
    useOrganiserDashContext();
  const [checkedEvent, setCheckedEvent] = useState<number | null>(null);

  const handleCheckbox = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setCheckedEvent(id); // Set the currently checked event
    } else {
      setCheckedEvent(null); // Clear the checked event when unchecked
    }
  };

  const handleCheckboxChange = (isChecked: CheckedState, id: number) => {
    // Ensure that we only handle true/false, and skip the "indeterminate" state
    if (typeof isChecked === "boolean") {
      handleCheckbox(id, isChecked);
    }
  };

  const handleNext = () => {
    handleIsChecked("selectEventState");
    nextSetUpStep();
  };
  return (
    <div className="w-full md:w-3/5 p-10 rounded-lg h-screen bg-white flex flex-col justify-between">
      <div>
        <div className="space-y-4">
          <h2 className="text-4xl font-pally-medium">Select campaign plan</h2>
          <p className="text-[#475367] font-pally-regular text-lg">
            Choose a campaign plan to boost your event
          </p>
          <Separator />
        </div>

        <Accordion type="single" collapsible className="mt-6 space-y-6">
          {features.map((item) => (
            <AccordionItem
              key={item.id}
              value={`item-${item.id}`}
              className="border border-[#10192814] rounded-xl px-2 md:px-4 bg-[#F4F6F9] py-3"
            >
              <AccordionTrigger>
                <div className="flex justify-start items-center gap-4">
                  <Checkbox
                    className="w-6 h-6 border-black"
                    checked={checkedEvent === item.id} // Only check the one that matches
                    onCheckedChange={(isChecked) =>
                      handleCheckboxChange(isChecked, item.id)
                    }
                  />
                  <p className="font-pally-medium text-lg text-[#344054]">
                    <span>{item.name}</span> - <span>{toFiat(item.price)}</span>
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mx-5 md:mx-10">
                <ul className="list-disc">
                  <li className="font-pally-regular text-sm md:text-base text-[#667185]">
                    This Plan includes all the following perks below
                  </li>
                  <li className="font-pally-regular text-sm md:text-base text-[#667185]">
                    {item?.platforms.map((text) => (
                      <span>{text}</span>
                    ))}
                  </li>
                  <li className="font-pally-regular text-sm md:text-base text-[#667185]">
                    {item.impression} Impressions
                  </li>
                  <li className="font-pally-regular text-sm md:text-base text-[#667185]">
                    {item.duration} runtime duration
                  </li>
                  <li className="font-pally-regular text-sm md:text-base text-[#667185]">
                    {item.addOns}
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div>
        <Separator />
        <div className="mt-5 flex justify-end ">
          <Button
            onClick={handleNext}
            disabled={checkedEvent == null}
            variant="destructive"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectCampaign;
