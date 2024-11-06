"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import MeetYourOganiser from "../user-dashboard/MeetYourOganiser";
import ShowLocation from "./ShowLocation";
import EventsTags from "./EventsTags";
import EventsSpeakers from "./EventsGuests";
import EventsAgenda from "./EventsAgenda";
import EventsVendorPass from "./EventsVendorPass";

const AboutEventDetail: React.FC<{ event: any }> = ({ event }) => {
  const startDate: string =
    event?.oneTimeEvent?.startDate || event?.recurringEvent?.startDate;

  const startTime: string =
    event?.oneTimeEvent?.startTime || event?.recurringEvent?.startTime;

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
    <div className="space-y-5 mt-4">
      <div className="space-y-1 my-6">
        <p className="text-[#2C2B2E] text-base md:text-lg font-pally-regular">
          {event?.locationType === "physical"
            ? event?.physicalLocation?.address
            : "Virtual"}
        </p>

        <div className="flex items-center gap-4">
          <p className="text-[#2C2B2E] text-base md:text-lg font-pally-regular">
            {formattedDate}
          </p>
          <div className="h-5 border border-gray-400" />
          <p className="text-[#2C2B2E] text-base md:text-lg font-pally-regular">
            {formattedTime}
          </p>
        </div>
      </div>

      <Separator />

      <div>
        <p className="text-[#2C2B2E] text-base md:text-lg font-pally-medium">
          About the event
        </p>
        <p className="text-[#2C2B2E] text-base md:text-lg font-pally-regular mt-2">
          {event?.eventDescription}
        </p>
      </div>

      <Separator />

      {event?.eventAgendas && <EventsAgenda event={event?.eventAgendas} />}

      <Separator />

      {event?.eventVendors && <EventsVendorPass vendor={event?.eventVendors} />}


      <Separator />

      <MeetYourOganiser />

      <Separator />

      <ShowLocation />

      <Separator />

      {event?.guestList && <EventsSpeakers guests={event?.guestList} />}

      <Separator />

      {event?.eventCategory && <EventsTags tags={event?.eventCategory} />}
    </div>
  );
};

export default AboutEventDetail;
