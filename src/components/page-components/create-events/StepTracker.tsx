"use client"
import { useGetEvent } from "@/hooks/events/useGetEvent";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useRouter } from "next/navigation";
import React from "react";
import { GrFormCheckmark } from "react-icons/gr";
import { RiArrowLeftSLine } from "react-icons/ri";

const StepTracker = () => {
  const { currentStep } = useCreateEventContext();
  const { data: event } = useGetEvent();
  const router = useRouter();
  return (
    <div>
      <div className="bg-white rounded-xl p-6 lg:block hidden space-y-4 w-full max-w-md">
        <p
          onClick={() => router.back()}
          className="flex cursor-pointer hover:underline items-center gap-2 font-pally-regular text-lg"
        >
          <span>
            <RiArrowLeftSLine size={20} />
          </span>
          Back to event
        </p>

        <div className="bg-gray-600 h-40 w-full flex justify-center items-center rounded-lg">
          {currentStep > 1 && event?.data?.thumbnail ? (
            <img
              src={event?.data?.thumbnail}
              width={320}
              height={120}
              alt={event?.data?.eventName}
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            <p className="text-center font-pally-medium text-sm text-gray-300">
              No event banner
            </p>
          )}
        </div>

        <p className="font-pally-medium text-[#616873] text-2xl">
          {currentStep > 1 && event?.data?.eventName
            ? event?.data?.eventName
            : " 'Untitled' "}
        </p>

        <div className="block mt-5">
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {event?.data?.locationType !== "" || currentStep > 4 ? (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={18} />
                </div>
              ) : (
                <div className="border border-black rounded-full h-5 w-5" />
              )}
              <p className={`font-pally-regular text-lg`}>Basic Information</p>
            </div>
            <div className="border-r-2 ml-2.5 h-[2rem] border-[#AFB5BE] rotate-180" />
          </div>
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {event?.data?.refundPolicyAgreed || currentStep > 5 ? (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={18} />
                </div>
              ) : (
                <div className="border border-black rounded-full h-5 w-5" />
              )}
              <p className={`font-pally-regular text-lg`}>Event Details</p>
            </div>
            <div className="border-r-2 ml-2.5 h-[2rem] border-[#AFB5BE] rotate-180" />
          </div>
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {currentStep > 6 ? (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={18} />
                </div>
              ) : (
                <div className="border border-black rounded-full h-5 w-5" />
              )}
              <p className={`font-pally-regular text-lg`}>Add tickets</p>
            </div>
            <div className="border-r-2 ml-2.5 h-[2rem] border-[#AFB5BE] rotate-180" />
          </div>
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {event?.data?.isPublished ? (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={18} />
                </div>
              ) : (
                <div className="border border-black rounded-full h-5 w-5" />
              )}
              <p className={`font-pally-regular text-lg`}>Review and publish</p>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTracker;
