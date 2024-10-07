import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import React from "react";
import { GrFormCheckmark } from "react-icons/gr";

const SetupSteps = () => {
  const { isChecked, currentStep } = useOrganiserDashContext();
  return (
    <div className="w-1/2 py-10">
      <div className="w-full max-w-md space-y-9">
        <h1 className="text-4xl font-pally-medium">
          Let’s get started with promoting your event!{" "}
        </h1>
        <p className="text-[#101928] font-pally-regular text-lg">
          You’re just a few steps away from reaching your audience.
        </p>

        <div>
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {!isChecked.campaignTypeState ? (
                <div className="border border-black rounded-full h-4 w-4" />
              ) : (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={16} />
                </div>
              )}
              <p className="font-pally-regular">Campaign Type</p>
            </div>
            <div className="border-r-2 ml-2 h-[2rem] border-[#AFB5BE] rotate-180" />
          </div>
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {!isChecked.campaignTypeState ? (
                <div className="border border-black rounded-full h-4 w-4" />
              ) : (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={16} />
                </div>
              )}
              <p className="font-pally-regular">Select Event</p>
            </div>
            <div className="border-r-2 ml-2 h-[2rem] border-[#AFB5BE] rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupSteps;
