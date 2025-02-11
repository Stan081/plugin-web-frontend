import Image from "next/image";
import React, { FC } from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { TabProgress } from "./TabProgress";
import Link from "next/link";

const HomeTabCard: FC<{ card: any }> = ({ card }) => {
  const startDate: string =
    card?.startDate || card?.startDate;

  const startTime: string =
    card?.startTime || card?.startTime;

  const date = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric", // Add year to the options
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
    <div className="border rounded-xl p-3 md:p-6 gap-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-28 md:h-32 w-28 md:w-32">
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
            Starts{" "}
            <span className="font-pally-medium text-[#3D89DF]">
              {formattedDate ?? "No set date"}
            </span>{" "}
            at{" "}
            <span className="font-pally-medium text-[#3D89DF]">
              {formattedTime ?? "No set time"}
            </span>
          </p>
          <div className="hidden lg:flex items-center gap-2">
            <p className="text-[#667185] whitespace-nowrap font-pally-regular text-base">
              Ticket Sale
            </p>
            <div className=" w-52">
              <TabProgress value={2} max={60} />
            </div>
            <p className="text-[#667185] whitespace-nowrap font-pally-regular">
              2/40
            </p>
          </div>
        </div>
      </div>
      <Link
        href={`/organiser/events/${card?._id}`}
        className="lg:border border-gray-100 cursor-pointer rounded-lg p-3 lg:p-5 space-y-2 flex flex-col items-center"
      >
        <BsGraphUpArrow size={28} color="#D9302A" />
        <p className="text-[#D9302A] hidden lg:flex font-pally-medium text-lg underline">
          View Stat
        </p>
      </Link>
    </div>
  );
};

export default HomeTabCard;
