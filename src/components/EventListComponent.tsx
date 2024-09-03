import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import React, { FC, useState } from "react";
import TicketIcon from "./icons/ticket";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface EventProps {
  id: string;
  image: string;
  eventType: string;
  title: string;
  location: string;
  date: string;
  priceRange: string;
}

const EventListComponent: FC<EventProps> = ({
  id,
  image,
  eventType,
  title,
  location,
  date,
  priceRange,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // router
  const router = useRouter();
  return (
    <div>
      <div className="flex mb-3 border-b gap-2.5 pb-7 w-full justify-between">
        <div className="flex gap-3">
          <div className="relative w-[256px] rounded-2xl border overflow-hidden">
            <Image
              className="w-contain h-48 "
              src={image}
              alt={title}
              width={300}
              height={200}
            />
            <div className="absolute bottom-2 left-2 bg-destructive text-white text-xs font-semibold px-2 py-1 rounded-3xl font-pally-medium">
              {eventType}
            </div>
          </div>
          <div
            onClick={() => router.push(`/tickets/${id}`)}
            className="p-4 cursor-pointer transition delay-75 ease-in-out"
          >
            <h2 className="text-lg md:text-xl font-bold font-pally-medium">
              {title.length > 16 ? title.slice(0, 16).concat("...") : title}
            </h2>
            <p className="text-sm md:text-lg text-gray-500 font-pally-regular">
              {location}
            </p>
            <p className="text-sm md:text-lg destructive font-pally-regular">
              {date}
            </p>
            <div className="flex items-center gap-1 mt-3">
              <TicketIcon />{" "}
              <p className="text-sm md:text-lg text-black font-pally-medium">
                {priceRange}
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={() => setIsFavorite(!isFavorite)}
          className="text-white p-3 cursor-pointer self-center justify-self-end"
        >
          {!isFavorite ? (
            <RiHeartLine size={24} color="#000000" />
          ) : (
            <RiHeartFill size={24} color="#EB7257" />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventListComponent;
