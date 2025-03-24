import Image from "next/image";
import React, { FC, useMemo } from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { TabProgress } from "./TabProgress";
import Link from "next/link";
import { useGetSalesRecord } from "@/hooks/organiser/useGetSalesRecord";

const HomeTabCard: FC<{ card: any }> = ({ card }) => {
  // const { data: sales } = useGetSalesRecord(card?._id);

  const startDate: string = card?.startDate;

  const startTime: string = card?.startTime;
  const date = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "long",
    day: "numeric",
    timeZone: "Africa/Lagos",
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
    timeZone: "Africa/Lagos",
  });

  return (
    <div className="border rounded-xl p-4 gap-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-28 w-28 md:w-32">
          <Image
            src={card?.thumbnail ?? "/images/blue-bg.png"}
            alt={card?.eventName || "event"}
            width={160}
            height={134}
            className="rounded-lg pointer-events-none object-cover w-full h-full"
          />
        </div>
        <div className=" h-full space-y-3">
          <p className="font-pally-medium text-[#2C2B2E] text-base md:text-xl">
            {card?.eventName
              ? card?.eventName.slice(0, 1).toLocaleUpperCase() +
                card?.eventName.slice(1)
              : card?.eventName}
          </p>
          <p className="font-pally-regular text-[#586170] text-sm md:text-base">
            {card?.address}
          </p>
          <p className="font-pally-regular text-[#586170] text-sm md:text-base">
            Starts{" "}
            <span className="font-pally-medium text-[#3D89DF]">
              {formattedDate ?? "No set date"}
            </span>{" "}
            at{" "}
            <span className="font-pally-medium text-[#3D89DF]">
              {formattedTime ?? "No set time"}
            </span>
          </p>
        </div>
      </div>
      <Link
        href={`/organiser/events/${card?._id}`}
        className="lg:border border-gray-100 cursor-pointer rounded-lg p-3 lg:p-5 space-y-2 flex flex-col items-center"
      >
        <BsGraphUpArrow size={20} color="#D9302A" />
        <p className="text-[#D9302A] hidden lg:flex font-pally-medium text-base underline">
          View Stat
        </p>
      </Link>
    </div>
  );
};

export default HomeTabCard;
