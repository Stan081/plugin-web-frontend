"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import MeetYourOganiser from "../user-dashboard/MeetYourOganiser";
import EventsTags from "./EventsTags";
import EventsSpeakers from "./EventsGuests";
import EventsAgenda from "./EventsAgenda";
import EventsVendorPass from "./EventsVendorPass";
import EventGallery from "./EventGallery";
import SeatMap from "./SeatMap";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AboutEventDetail: React.FC<{ event: any, isPassed: boolean }> = ({ event , isPassed}) => {
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
            ? `${event?.physicalLocation?.address}, ${event?.physicalLocation?.city}, ${event?.physicalLocation?.state}, ${event?.physicalLocation?.country}.`
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

      {event?.eventAgendas?.length > 0 && event?.eventAgendas && (
        <EventsAgenda event={event?.eventAgendas} />
      )}

      {event?.eventAgendas?.length > 0 && <Separator />}

      {event?.ticketCategory === "grouped" &&
        event?.groupedTicket?.seatMap?.length !== 0 && (
          <SeatMap groupedTicket={event?.groupedTicket} />
        )}

      {event?.ticketCategory === "grouped" &&
        event?.groupedTicket?.length !== 0 && <Separator />}

      {event?.eventVendors?.length > 0 && event?.eventVendors && isPassed && (
        <EventsVendorPass vendor={event?.eventVendors} />
      )}

      {event?.eventVendors?.length > 0 && isPassed && <Separator />}

      <MeetYourOganiser organiserId={event?.userId} />

      <Separator />

      {/* <ShowLocation /> */}

      {/* <Separator /> */}

      {event?.eventPhotos?.length > 0 && event?.eventPhotos && (
        <EventGallery photos={event?.eventPhotos} />
      )}

      {event?.eventPhotos?.length > 0 && <Separator />}

      {event?.guestList?.length > 0 && event?.guestList && (
        <EventsSpeakers guests={event?.guestList} />
      )}

      {event?.guestList?.length > 0 && <Separator />}

      {event?.eventCategory && <EventsTags tags={event?.eventCategory} />}
    </div>
  );
};

export default AboutEventDetail;
