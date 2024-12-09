"use client";
import { useGetEvent } from "@/hooks/events/useGetEvent";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useRouter } from "next/navigation";
import React from "react";
import { GrFormCheckmark } from "react-icons/gr";
import { RiArrowLeftSLine } from "react-icons/ri";

const StepTracker = () => {
  const { currentStep } = useCreateEventContext();
  const { data: event, isLoading } = useGetEvent();
  const router = useRouter();

  const startDate: string =
    event?.data?.oneTimeEvent?.startDate ||
    event?.data?.recurringEvent?.startDate;

  const startTime: string =
    event?.data?.oneTimeEvent?.startTime ||
    event?.data?.recurringEvent?.startTime;

  const date = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-GB", options);

  const [hour, minute] = startTime ? startTime.split(":") : ["00", "00"];
  const formattedTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    Number(hour),
    Number(minute)
  ).toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  });
  return (
    <div>
      {isLoading && <SpinnerOverlay />}
      <div className="lg:hidden flex gap-5">
        <div className="bg-gray-600 h-16 w-16 flex justify-center items-center rounded-lg">
          {event?.data?.thumbnail ? (
            <img
              src={event?.data?.thumbnail}
              width={320}
              height={120}
              alt={event?.data?.eventName}
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            <p className="text-center font-pally-medium text-xs text-gray-300">
              No event banner
            </p>
          )}
        </div>
        <div className="space-y-3">
          <p className="font-pally-medium text-[#616873] text-base">
            {currentStep > 1 || event?.data?.eventName
              ? event?.data?.eventName
              : " 'Untitled' "}
          </p>
          <p className="flex items-center gap-3 text-sm text-gray-600">
            {event?.data?.oneTimeEvent?.startDate ||
            event?.data?.recurringEvent?.startDate ? (
              <span>
                {formattedDate} | {formattedTime}
              </span>
            ) : (
              "Date not set yet"
            )}
          </p>
        </div>
      </div>
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

        {event?.data?.thumbnail ? (
          <img
            src={event?.data?.thumbnail}
            width={320}
            height={120}
            alt={event?.data?.eventName}
            className="w-full h-40 rounded-lg object-cover"
          />
        ) : (
          <div className="bg-gray-600 h-40 w-full flex justify-center items-center rounded-lg">
            <p className="text-center font-pally-medium text-sm text-gray-300">
              No event banner
            </p>
          </div>
        )}

        <p className="font-pally-medium text-[#616873] text-2xl">
          {currentStep > 1 || event?.data?.eventName
            ? event?.data?.eventName
            : " 'Untitled' "}
        </p>

        <div className="block mt-5">
          <div className={`flex flex-col justify-between `}>
            <div className="flex items-center gap-2">
              {currentStep > 4 ||
              event?.data?.oneTimeEvent?.startDate ||
              event?.data?.recurringEvent?.startDate ||
              event?.data?.locationType ? (
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
              {currentStep > 6 ||
              event?.data?.ticketCategory ||
              event?.data?.groupedTicket.length ||
              event?.data?.entryTicket ? (
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
