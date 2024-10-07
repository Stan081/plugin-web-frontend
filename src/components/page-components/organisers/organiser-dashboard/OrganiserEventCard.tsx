import React from "react";
import Image from "next/image";
// import { Progress } from "@/components/ui/progress";

type EventCardProps = {
  title: string;
  date: string;
  location: string;
  visibility: string;
  ticketsSold: number;
  totalTickets: number;
  imageUrl: string;
  status: string;
};

const OrganiserEventCard: React.FC<EventCardProps> = ({
  title,
  date,
  location,
  visibility,
  ticketsSold,
  totalTickets,
  imageUrl,
  status,
}) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-600 text-white";
      case "drafts":
        return "bg-gradient-to-r from-[#FFF6F1] to-[#FDE5E3] text-[#9E0A05]";
      case "past":
        return "bg-gray-300 text-gray-700";
      default:
        return "bg-blue-600 text-white";
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden border border-gray-200 rounded-lg p-2">
      {/* Event Image */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded"
          src={imageUrl}
          alt={title}
        />
        <span
          className={`absolute top-2 left-2 font-pally-regular text-xs px-2 py-1 rounded-full capitalize ${getStatusStyles(
            status
          )}`}
        >
          {status}
        </span>
      </div>

      {/* Event Details */}
      <div className="p-2">
        <h3 className="font-pally-regular text-400 text-lg mb-2">{title}</h3>
        <p className="font-pally-regular text-gray-400 mb-2">{date}</p>
        <div className="flex flex-row gap-2">
          <p className="font-pally-regular text-gray-500 mb-2 flex items-center gap-2">
            <Image
              src="/images/icons/map-marker.svg"
              alt="location"
              width={16}
              height={16}
            />
            {location}
          </p>
          <div className="border border-gray-300 rotate-0 h-5 hidden lg:block" />
          <p className=" font-pally-regular text-gray-500 text-sm mb-2 flex items-center gap-2">
            <Image
              src="/images/icons/planet-icon.svg"
              alt="visibility"
              width={16}
              height={16}
            />
            {visibility}
          </p>
        </div>

        {/* Ticket Progress */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <span className="font-pally-regular text-gray-500 mb-2">
              Tickets Sold
            </span>
            {/* <Progress value={(ticketsSold / totalTickets) * 100} /> */}
            <span className="text-xs font-semibold inline-block text-red-600">
              {ticketsSold}/{totalTickets}
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default OrganiserEventCard;
