"use client";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import React, { FC, useState } from "react";
import TicketIcon from "./icons/ticket";
import { useRouter } from "next/router"; // Ensure correct import for useRouter
import { toFiat } from "@/lib/amount";

const CardComponent: FC<{ card: any }> = ({ card }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/explore-events/${id}`);
  };

  const startDate: string =
    card?.oneTimeEvent?.startDate || card?.recurringEvent?.startDate;

  const startTime: string =
    card?.oneTimeEvent?.startTime || card?.recurringEvent?.startTime;

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

  const getGroupPrice = card?.groupTicket
    ?.filter((item) => item?.ticketPrice !== undefined)
    .map((item) => item.ticketPrice); // Extract ticketPrice from each object

  const getEntry = card?.entryTicket && card?.entryTicket?.ticketPrice;

  console.log(getGroupPrice);
  return (
    <div className="w-full max-w-xs shrink-0 rounded-xl overflow-hidden bg-white border flex flex-col justify-between border-gray-200 ">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={card?.thumbnail ?? "/images/blue-bg.png"}
          alt={card?.eventName || "Event image"}
          width={300}
          height={200}
        />

        <div className="absolute bottom-2 left-2 bg-destructive text-white text-xs font-pally-medium px-2 py-1 rounded-3xl">
          {card?.publishStatus}
        </div>
        <div
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer"
        >
          {!isFavorite ? (
            <RiHeartLine size={24} />
          ) : (
            <RiHeartFill size={24} color="#EB7257" />
          )}
        </div>
      </div>
      <div
        onClick={() => handleCardClick(card?._id)}
        className="p-4 cursor-pointer  hover:bg-gray-100 transition delay-75 ease-in-out"
      >
        <h2 className="text-lg md:text-xl font-bold font-pally-medium">
          {card?.eventName?.length > 25
            ? card?.eventName.slice(0, 25).concat("...")
            : card?.eventName}
        </h2>
        <p className="text-sm md:text-lg text-gray-500 font-pally-regular">
          {card?.locationType === "physical"
            ? card?.physicalLocation?.address
            : "Online"}
        </p>

        <div className="flex items-center gap-4">
          <p className="text-sm md:text-lg destructive font-pally-regular">
            {formattedDate}
          </p>
          <div className="h-5 border border-gray-400" />
          <p className="text-sm md:text-lg destructive font-pally-regular">
            {formattedTime}
          </p>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <TicketIcon />
          <p className="text-sm md:text-lg text-black font-pally-medium">
            {toFiat(card?.entryTicket?.ticketPrice)}
            {/* 900 */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
