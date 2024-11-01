import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import React from "react";
import { GrFormCheckmark } from "react-icons/gr";

const SetupSteps = () => {
  const { isChecked, currentStep } = useOrganiserDashContext();
  return (
    <div className="w-full md:w-2/5 py-10 ">
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
                <div className="border border-black rounded-full h-6 w-6" />
              ) : (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={18} />
                </div>
              )}
              <p
                className={
                  currentStep === 1
                    ? `font-pally-medium text-lg`
                    : `font-pally-regular text-lg`
                }
              >
                Campaign Type
              </p>
            </div>
            <div className="border-r-2 ml-3 h-[2rem] border-[#AFB5BE] rotate-180" />
          </div>
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {!isChecked.selectEventState ? (
                <div className="border border-black rounded-full h-6 w-6" />
              ) : (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={18} />
                </div>
              )}
              <p
                className={
                  currentStep === 2
                    ? `font-pally-medium text-lg`
                    : `font-pally-regular text-lg`
                }
              >
                Select Event
              </p>
            </div>
            <div className="border-r-2 ml-3 h-[2rem] border-[#AFB5BE] rotate-180" />
          </div>
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {!isChecked.campaignPlanState ? (
                <div className="border border-black rounded-full h-6 w-6" />
              ) : (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={18} />
                </div>
              )}
              <p
                className={
                  currentStep === 3
                    ? `font-pally-medium text-lg`
                    : `font-pally-regular text-lg`
                }
              >
                Select campaign plan{" "}
              </p>
            </div>
            <div className="border-r-2 ml-3 h-[2rem] border-[#AFB5BE] rotate-180" />
          </div>
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {!isChecked.StartCampaignState ? (
                <div className="border border-black rounded-full h-6 w-6" />
              ) : (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={18} />
                </div>
              )}
              <p
                className={
                  currentStep === 4
                    ? `font-pally-medium text-lg`
                    : `font-pally-regular text-lg`
                }
              >
                Review and Start Campaign{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupSteps;
