import { Heart } from "lucide-react";
import React, { FC } from "react";
import TicketIcon from "./icons/ticket";
import { CardProps } from "@/static-datas/cards-data";

const CardComponent: FC<CardProps> = ({ image, eventType, title, location, date, priceRange }) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
      <div className="relative">
        <img
          className="w-full h-48 "
          src={image}
          alt={title}
          width={300}
          height={200}
        />
        <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-3xl font-pally-medium">
          {eventType}
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full">
          <Heart size={24} />
        </div>
      </div>
      <div className="p-4 cursor-pointer  hover:bg-gray-100 transition delay-75 ease-in-out">
        <h2 className="text-xl font-bold font-pally-medium">{title}</h2>
        <p className="text-base md:text-lg text-gray-500 font-pally-regular">{location}</p>
        <p className="text-base md:text-lg text-[#D9302A] font-pally-regular">{date}</p>
        <div className="flex items-center gap-1 mt-3">
          <TicketIcon />{" "}
          <p className="text-base md:text-lg text-black font-pally-medium">{priceRange}</p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
