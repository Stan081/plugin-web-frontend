import { useCreateEventContext } from "@/providers/create_event.provider";
import { useRouter } from "next/navigation";
import React from "react";
import { GrFormCheckmark } from "react-icons/gr";
import { RiArrowLeftSLine } from "react-icons/ri";

const StepTracker = () => {
  const { currentStep } = useCreateEventContext();
  const router = useRouter();
  return (
    <div>
      <div className="bg-white rounded-xl p-6 lg:block hidden space-y-4 w-full max-w-md">
        <p
          onClick={() => router.back()}
          className="flex cursor-pointer hover:underline items-center gap-2 font-pally-medium text-lg"
        >
          <span>
            <RiArrowLeftSLine size={20} />
          </span>
          Back to event
        </p>

        <div className="bg-gray-600 h-36 w-full flex justify-center items-center rounded-lg">
          <p className="text-center font-pally-medium text-sm text-gray-300">
            No event banner
          </p>
        </div>

        <p className="font-pally-medium text-[#98A2B3] text-2xl">
          “ Untitled “
        </p>

        <div>
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {currentStep > 4 ? (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={18} />
                </div>
              ) : (
                <div className="border border-black rounded-full h-6 w-6" />
              )}
              <p
                className={
                  currentStep > 4
                    ? `font-pally-medium text-lg`
                    : `font-pally-regular text-lg`
                }
              >
                Basic Information
              </p>
            </div>
            <div className="border-r-2 ml-3 h-[2rem] border-[#AFB5BE] rotate-180" />
          </div>
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {currentStep > 5 ? (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={18} />
                </div>
              ) : (
                <div className="border border-black rounded-full h-6 w-6" />
              )}
              <p
                className={
                  currentStep > 5
                    ? `font-pally-medium text-lg`
                    : `font-pally-regular text-lg`
                }
              >
                Event Details
              </p>
            </div>
            <div className="border-r-2 ml-3 h-[2rem] border-[#AFB5BE] rotate-180" />
          </div>
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {currentStep > 6 ? (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={18} />
                </div>
              ) : (
                <div className="border border-black rounded-full h-6 w-6" />
              )}
              <p
                className={
                  currentStep > 3
                    ? `font-pally-medium text-lg`
                    : `font-pally-regular text-lg`
                }
              >
                Add tickets
              </p>
            </div>
            <div className="border-r-2 ml-3 h-[2rem] border-[#AFB5BE] rotate-180" />
          </div>
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {currentStep === 7 ? (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={18} />
                </div>
              ) : (
                <div className="border border-black rounded-full h-6 w-6" />
              )}
              <p
                className={
                  currentStep === 7
                    ? `font-pally-medium text-lg`
                    : `font-pally-regular text-lg`
                }
              >
                Review and publish
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTracker;
