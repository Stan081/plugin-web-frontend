import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import React, { FC, useState } from "react";
import TicketIcon from "./icons/ticket";
import { CardProps } from "@/static-datas/cards-data";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CardComponent: FC<CardProps> = ({
  id,
  image,
  eventType,
  title,
  location,
  date,
  priceRange,
}) => {
  // state to toggle favorite
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // router
  const router = useRouter();
  return (
    <div className=" flex-shrink-0 rounded-xl overflow-hidden bg-white border border-gray-200  w-full max-w-[330px]">
      <div className="relative">
        <Image
          className="w-full h-48 "
          src={image}
          alt={title}
          width={300}
          height={200}
        />
        <div className="absolute bottom-2 left-2 bg-destructive text-white text-xs font-semibold px-2 py-1 rounded-3xl font-pally-medium">
          {eventType}
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
        onClick={() => router.push(`/tickets/${id}`)}
        className="p-4 cursor-pointer  hover:bg-gray-100 transition delay-75 ease-in-out"
      >
        <h2 className="text-lg md:text-xl font-bold font-pally-medium">
          {title.length > 16 ? title.slice(0, 16).concat('...') : title}
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
  );
};

export default CardComponent;
