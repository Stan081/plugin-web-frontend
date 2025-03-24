"use client"
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import { useEventsContext } from "@/providers/events.provider";
import Image from "next/image";
import React, { FC, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";

interface CheckoutSummaryProps {
  startDate: string;
  startTime: string;
  thumbnail: string;
  eventName: string;
  locationType: string;
  address: string;
}

const CheckoutSummary: FC<CheckoutSummaryProps> = ({
  startDate,
  startTime,
  thumbnail,
  eventName,
  locationType,
  address,
}) => {
  const { tickets, entryData, setEntryData } = useEventsContext();

  useEffect(() => {
    const cookie = Cookies.get("entryTicket");
    if (cookie) {
      try {
        const entry = JSON.parse(cookie);
        setEntryData(entry);
      } catch (error) {
        console.error("Error parsing cookie:", error);
      }
    }
  }, [setEntryData]);

  const groupedTicketCookie = Cookies.get("tickets");

  const formattedDate = useMemo(() => {
    const date = new Date(startDate);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "long",
      day: "numeric",
      timeZone: "Africa/Lagos",
    };
    return date.toLocaleDateString("en-GB", options);
  }, [startDate]);

  const formattedTime = useMemo(() => {
    const date = new Date(startDate);
    const [hour, minute] = startTime ? startTime.split(":") : ["00", "00"];
    return new Date(
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
  }, [startDate, startTime]);

  const totalticketPrice = useMemo(() => {
    return tickets.reduce((sum, item) => {
      if (item?.price) {
        return sum + item.quantity * item.price;
      }
      return sum;
    }, 0);
  }, [tickets]);

  const renderTickets = () => {
    if (groupedTicketCookie) {
      return tickets.map((item, index) => (
        <div key={index} className="flex justify-between">
          <p className="text-[#586170] text-sm font-pally-regular">
            {item?.quantity} x {item?.name}
          </p>
          <p className="text-[#586170] text-sm font-pally-regular">
            {toFiat(
              item?.price === undefined ? 0 : item?.price * item?.quantity
            )}
          </p>
        </div>
      ));
    }
    return null;
  };

  const renderEntryData = () => {
    if (entryData) {
      return (
        <div className="flex justify-between">
          <p className="text-[#586170] text-sm font-pally-regular">
            {entryData?.quantity} x {entryData?.name}
          </p>
          <p className="text-[#586170] text-sm font-pally-regular">
            {toFiat(Number(entryData?.price * entryData?.quantity))}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-lg border p-3 w-full max-w-md">
      <Image
        src={thumbnail}
        width={456}
        height={280}
        alt={eventName}
        className="pointer-events-none w-full h-[228px] object-cover rounded-lg "
        loading="lazy"
      />

      <div className="mt-4 space-y-4">
        <div className=" space-y-1">
          <p className="text-[#586170] text-sm md:text-xl font-pally-medium">
            {eventName}
          </p>
          <p className="text-[#586170] text-sm font-pally-regular">
            {locationType === "physical" ? address : "Online"}
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
          <p className="text-base font-pally-medium">
            Order summary
          </p>

          {renderTickets()}
          {renderEntryData()}
        </div>

        <Separator />

        <div>
          <div className="flex justify-between">
            <p className=" text-base md:text-lg font-pally-regular">Total</p>
            <p className=" text-base md:text-lg font-pally-medium">
              {(groupedTicketCookie &&
                tickets?.length !== 0 &&
                toFiat(totalticketPrice)) ||
                toFiat(Number(entryData?.price * entryData?.quantity))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
