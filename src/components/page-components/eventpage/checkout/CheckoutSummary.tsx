import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  thumbnail: string;
  eventName: string;
  date: Date;
  time: string;
}

const CheckoutSummary: FC<{ event: any }> = ({ event }) => {
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
  return (
    <div className="rounded-lg border p-3 w-full max-w-md">
      <Image
        src={event?.thumbnail ?? "/images/blue-bg.png"}
        width={456}
        height={280}
        alt={event?.eventName || "Event image"}
        className="pointer-events-none w-full h-[228px] object-cover rounded-lg"
      />

      <div className="mt-4 space-y-4">
        <div className=" space-y-1">
          <p className="text-[#586170] text-sm md:text-xl font-pally-medium">
            {event?.eventName}
          </p>
          <p className="text-[#586170] text-sm font-pally-regular">
            {event?.locationType === "physical"
              ? event?.physicalLocation?.address
              : "Online"}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-[#586170] text-sm font-pally-regular">
              {formattedDate ?? "No set date"}
            </p>
            <div className="h-3 border border-gray-400" />
            <p className="text-[#586170] text-sm font-pally-regular">
              {formattedTime ?? "No set time"}
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-1.5">
          <p className="text-sm md:text-base font-pally-medium">
            Order summary
          </p>
          <div className="flex justify-between">
            <p className="text-[#586170] text-sm font-pally-regular">
              1 x Barn Member
            </p>
            <p className="text-[#586170] text-sm font-pally-regular">
              {toFiat(3000)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#586170] text-sm font-pally-regular">
              2 x Barn Member
            </p>
            <p className="text-[#586170] text-sm font-pally-regular">
              {toFiat(25000)}
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex justify-between">
            <p className=" text-base font-pally-regular">Total</p>
            <p className=" text-base font-pally-regular">{toFiat(28000)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
