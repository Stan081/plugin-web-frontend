"use client";
import Image from "next/image";
import React, { FC } from "react";
import { TabProgress } from "../../home/TabProgress";
import { Checkbox } from "@/components/ui/checkbox";

type CheckedState = boolean | "checked" | "unchecked" | "indeterminate";

interface EventCardListProps {
  event: any;
  onCheckboxChange: (id: string, isChecked: boolean) => void;
  checkedEvent: string;
}

const EventCardList: FC<EventCardListProps> = ({
  event,
  checkedEvent,
  onCheckboxChange,
}) => {
  const startDate: string =
    event?.oneTimeEvent?.startDate || event?.recurringEvent?.startDate;

  const startTime: string =
    event?.oneTimeEvent?.startTime || event?.recurringEvent?.startTime;

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

  const handleCheckboxChange = (isChecked: CheckedState, id: string) => {
    if (typeof isChecked === "boolean") {
      onCheckboxChange(id, isChecked);
    }
  };

  return (
    <div className="border-b last:border-none py-4 md:py-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {event?.thumbnail && (
          <Image
            src={event?.thumbnail}
            alt={event?.eventName}
            width={160}
            height={134}
            className="rounded-lg pointer-events-none object-cover w-40 h-32"
          />
        )}
        <div className="h-full space-y-3">
          <p className="font-pally-medium text-[#2C2B2E] text-base md:text-xl">
            {event?.eventName?.length > 25
              ? event?.eventName.slice(0, 25).concat("...")
              : event?.eventName}
          </p>
          <p className="font-pally-regular text-[#586170]">
            Starts{" "}
            <span className="font-pally-medium text-[#3D89DF]">
              {formattedDate}
            </span>{" "}
            at{" "}
            <span className="font-pally-medium text-[#3D89DF]">
              {formattedTime}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <p className="text-[#667185] whitespace-nowrap font-pally-regular text-base">
              Sale progress
            </p>
            <div className="w-52">
              <TabProgress value={10} max={100} />
            </div>
            <p className="text-[#667185] whitespace-nowrap font-pally-regular">
              {10}/{100}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Checkbox
          className="w-5 h-5 border-black"
          checked={checkedEvent === event?._id}
          onCheckedChange={(isChecked) =>
            handleCheckboxChange(isChecked, event?._id)
          }
        />
      </div>
    </div>
  );
};

export default EventCardList;
