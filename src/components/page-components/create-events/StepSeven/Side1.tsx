"use client";
import Logo from "@/components/Logo";
import Image from "next/image";
import React, { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineClock } from "react-icons/hi2";
import { SlLocationPin } from "react-icons/sl";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useGetEvent } from "@/hooks/events/useGetEvent";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";

const Side1 = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const { data: eventData, isLoading } = useGetEvent();

  const startDate: string =
    eventData?.data?.oneTimeEvent?.startDate ||
    eventData?.data?.recurringEvent?.startDate;

  const startTime: string =
    eventData?.data?.oneTimeEvent?.startTime ||
    eventData?.data?.recurringEvent?.startTime;

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
    <div className="w-full lg:w-2/5 px-4 lg:px-0">
      {isLoading && <SpinnerOverlay />}
      <Logo />
      <div className="flex flex-col justify-between md:space-y-5 mt-6 ">
        <h1 className="text-[#020912] font-pally-regular text-xl md:text-3xl w-full md:max-w-xl md:leading-tight">
          Almost there, you're ready to publish your first event
        </h1>
        <div className="mt-5 lg:mt-0 flex flex-row lg:flex-col items-start gap-5">
          <div className="md:border-4 lg:mt-4 border-[#FBD4D1] rounded-md w-24 h-24 lg:w-3/5 lg:h-56">
            <Image
              src={eventData?.data?.thumbnail ?? "/images/blue-bg.png"}
              width={487}
              height={270}
              alt="koo"
              className="w-full h-full object-cover pointer-events-none rounded-md"
            />
          </div>

          <div className="w-full max-w-xl">
            <p className="font-pally-medium text-lg lg:text-xl text-[#2F231B] mb-1">
              {eventData?.data?.eventName.slice(0, 1).toLocaleUpperCase() +
                eventData?.data?.eventName.slice(1)}
            </p>
            <p className="font-pally-regular text-sm lg:text-lg text-[#2F231B]">
              {eventData?.data?.eventDescription
                .slice(0, 1)
                .toLocaleUpperCase() +
                eventData?.data?.eventDescription.slice(1)}
            </p>
          </div>
        </div>

        <ul className="space-y-2 hidden lg:block">
          <li className="flex gap-3 items-center">
            <IoCalendarOutline color="#D9302A" size={20} />
            <p className="font-pally-regular text-[#344054]">{formattedDate}</p>
          </li>
          <li className="flex gap-3 items-center">
            <HiOutlineClock color="#D9302A" size={20} />
            <p className="font-pally-regular text-[#344054]">{formattedTime}</p>
          </li>
          <li className="flex gap-3 items-center">
            <SlLocationPin color="#D9302A" size={20} />
            <p className="font-pally-regular text-[#344054]">
              Silverbird cinemas gallery, Udoudoma Avenue, U Akwa Ibom
            </p>
          </li>
        </ul>

        <p
          onClick={() => setShowMore(!showMore)}
          className="mt-4 md:hidden text-sm font-pally-medium text-[#475367] flex items-center gap-2"
        >
          {showMore ? "Show less" : "Show more"}{" "}
          <span>
            {showMore ? (
              <RiArrowUpSLine size={17} />
            ) : (
              <RiArrowDownSLine size={17} />
            )}
          </span>
        </p>

        {showMore && (
          <ul className="space-y-2">
            <li className="flex gap-3 items-center">
              <IoCalendarOutline color="#D9302A" size={20} />
              <p className="font-pally-regular text-[#344054]">
                {formattedDate}
              </p>
            </li>
            <li className="flex gap-3 items-center">
              <HiOutlineClock color="#D9302A" size={20} />
              <p className="font-pally-regular text-[#344054]">
                {formattedTime}
              </p>
            </li>
            <li className="flex gap-3 items-center">
              <SlLocationPin color="#D9302A" size={20} />
              <p className="font-pally-regular text-[#344054]">
                Silverbird cinemas gallery, Udoudoma Avenue, U Akwa Ibom
              </p>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Side1;
