"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { TabProgress } from "../../home/TabProgress";
import { Checkbox } from "@/components/ui/checkbox";
import { OrganiserEvent } from "@/models/types/organiserTypes";
import { format } from "date-fns";

interface EventCardListProps extends OrganiserEvent {
  onCheckboxChange: (id: number, isChecked: boolean) => void;
}

const EventCardList: FC<EventCardListProps> = ({
  id,
  startTime,
  eventImage,
  eventName,
  startDate,
  ticketSale,
  totalTicket,
  onCheckboxChange,
}) => {

  const handleCheckboxChange = (isChecked: boolean) => {
    onCheckboxChange(Number(id), isChecked);
  };
  return (
    <div className=" border-b last:border-none py-4 md:py-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {eventImage && (
          <Image
            src={eventImage}
            alt={eventName}
            width={160}
            height={134}
            className="rounded-lg pointer-events-none object-cover w-40 h-32"
          />
        )}
        <div className=" h-full space-y-3">
          <p className="font-pally-medium text-[#2C2B2E] text-base md:text-xl">
            {eventName}
          </p>
          <p className="font-pally-regular text-[#586170]">
            Starts{" "}
            <span className="font-pally-medium text-[#3D89DF]">
              {format(new Date(startDate), "MM/dd/yyyy")}
            </span>{" "}
            at{" "}
            <span className="font-pally-medium text-[#3D89DF]">
              {startTime}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <p className="text-[#667185] whitespace-nowrap font-pally-regular text-base">
              Ticket Sale
            </p>
            <div className=" w-52">
              <TabProgress value={ticketSale} max={totalTicket} />
            </div>
            <p className="text-[#667185] whitespace-nowrap font-pally-regular">
              {ticketSale}/{totalTicket}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Checkbox
          className="w-6 h-6 border-black"
          onCheckedChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default EventCardList;
