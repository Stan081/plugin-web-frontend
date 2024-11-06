import { CardProps } from "@/static-datas/cards-data";
import Image from "next/image";
import React from "react";
import { RiHeartLine } from "react-icons/ri";

const CardComponent2 = ({
  id,
  image,
  eventType,
  title,
  location,
  date,
  priceRange,
  type, // Receive the type but don't display it
}: CardProps) => {
  return (
    <div className="min-w-[25%] group relative inline-block bg-[#221A14] rounded-2xl overflow-hidden ">
      <button className="w-full aspect-square block overflow-hidden">
        <figure className="relative size-full">
          <div className="absolute z-20 top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer">
            <RiHeartLine size={24} />
          </div>
          <div className="group-hover:opacity-0 absolute z-10 bottom-2 left-5 bg-destructive text-white text-xs font-semibold px-2 py-1 rounded-3xl">
            {eventType}
          </div>
          <Image
            fill={true}
            src="/images/corn.jpg"
            alt="corn"
            className="object-cover"
          />
        </figure>
      </button>
      {/* The hover card */}
      <div className="appear z-10 hidden backdrop-blur-[2px] px-5 py-1 font-pally-regular text-white justify-center items-start w-full h-full top-0 group-hover:flex flex-col group-hover:absolute bg-black bg-opacity-50 ">
        <p className="inline-flex bg-destructive text-white text-xs font-semibold px-2 py-1 rounded-3xl">
          {eventType}
        </p>
        <p>{title}</p>
        <p className="text-slate-300 font-extralight">{location}</p>
      </div>
      <p className="group-hover:opacity-0 px-3 py-1 font-pally-regular text-slate-200">{title}</p>
    </div>
  );
};

export default CardComponent2;
