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
import MapComponent from "@/components/Map";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AboutEventDetail: React.FC<{ event: any }> = ({ event }) => {
  const startDate: Date =
    event?.oneTimeEvent?.startDate || event?.recurringEvent?.startDate;

  const startTime: string =
    event?.oneTimeEvent?.startTime || event?.recurringEvent?.startTime;

  const endTime: string =
    event?.oneTimeEvent?.endTime || event?.recurringEvent?.endTime;

  const endDate: Date =
    event?.oneTimeEvent?.endDate || event?.recurringEvent?.endDate;

  const timeZone: string =
    event?.oneTimeEvent?.timeZone || event?.recurringEvent?.timeZone;

  const date = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "long",
    day: "numeric",
    timeZone: "Africa/Lagos",
  };

  const [hour, minute] = startTime ? startTime.split(":") : ["00", "00"];
  const StartTimeformattedTime = new Date(
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

  const [endHour, endMinute] = endTime ? endTime.split(":") : ["00", "00"];
  const EndTimeformattedTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    Number(endHour),
    Number(endMinute)
  ).toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Africa/Lagos",
  });

  // console.log(event);
  return (
    <div className="space-y-5 mt-4">
      <div className="space-y-1 my-6">
        <p className="text-[#2C2B2E] text-base md:text-lg font-pally-regular">
          {event?.locationType === "physical"
            ? `${event?.physicalLocation?.address}, ${event?.physicalLocation?.city}, ${event?.physicalLocation?.state}, ${event?.physicalLocation?.country}.`
            :  event?.locationType === 'online' && 'Online'}
        </p>

        <div className="flex items-center gap-4">
          <p className="destructive text-sm md:text-base font-pally-regular">
            {new Date(startDate).toLocaleDateString("en-GB", {
              day: "numeric",
              weekday: "short",
            })}
            , <span>{StartTimeformattedTime}</span> ---{" "}
            {new Date(endDate).toLocaleDateString("en-GB", {
              day: "numeric",
              weekday: "short",
            })}
            , <span>{EndTimeformattedTime}</span>
            {", "}
            {new Date(endDate).toLocaleDateString("en-GB", {
              month: "long",
              year: "numeric",
            })}
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
      {event?.eventVendors?.length > 0 && event?.eventVendors && (
        <EventsVendorPass vendor={event?.eventVendors} />
      )}
      {event?.eventVendors?.length > 0 && <Separator />}
      <MeetYourOganiser organiserId={event?.userId} />

      <Separator />

      {event?.physicalLocation?.latitude !== null &&
        event?.physicalLocation?.longitude !== null && (
          <MapComponent
            lat={Number(event?.physicalLocation?.latitude)}
            lng={Number(event?.physicalLocation?.longitude)}
          />
        )}

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
