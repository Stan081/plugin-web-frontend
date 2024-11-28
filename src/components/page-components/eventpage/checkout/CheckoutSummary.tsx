import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import { useEventsContext } from "@/providers/events.provider";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getCookie } from "@/lib/cookies";

const CheckoutSummary: FC<{ event: any }> = ({ event }) => {
  const { tickets, entryData, setEntryData } = useEventsContext();

  useEffect(() => {
    const checkoutEntryTicket = () => {
      const cookie = Cookies.get("entryTicket");
      if (cookie) {
        try {
          const entry = JSON.parse(cookie);
          setEntryData(entry);
        } catch (error) {
          console.error("Error parsing cookie:", error);
        }
      }
    };

    checkoutEntryTicket();
  }, []);

  const groupedTicketCookie = Cookies.get("tickets");

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

  const totalticketPrice = (): number => {
    const total = tickets.reduce((sum, item) => {
      if (item?.price) {
        return sum + item.quantity * item.price;
      }
      return sum;
    }, 0);
    return total;
  };

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
          {groupedTicketCookie &&
            tickets.map((item, index) => (
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
            ))}

          {entryData && (
            <div className="flex justify-between">
              <p className="text-[#586170] text-sm font-pally-regular">
                {entryData?.quantity} x {entryData?.name}
              </p>
              <p className="text-[#586170] text-sm font-pally-regular">
                {toFiat(Number(entryData?.price && entryData?.price))}
              </p>
            </div>
          )}
        </div>

        <Separator />

        <div>
          <div className="flex justify-between">
            <p className=" text-base md:text-lg font-pally-regular">Total</p>
            <p className=" text-base md:text-lg font-pally-medium">
              {(groupedTicketCookie &&
                tickets?.length !== 0 &&
                toFiat(totalticketPrice())) ||
                toFiat(Number(entryData?.price))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
