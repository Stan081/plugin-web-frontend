import { CardProps } from "@/static-datas/cards-data";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

const CardComponent2: FC<{ card: any }> = ({ card }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/explore-events/${id}`);
  };
  return (
    <div className="min-w-[25%] group relative inline-block bg-[#221A14] rounded-2xl overflow-hidden ">
      <button className="w-full aspect-square block overflow-hidden">
        <figure className="relative size-full">
          <div className="absolute z-20 top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer">
            {!isFavorite ? (
              <RiHeartLine size={24} />
            ) : (
              <RiHeartFill size={24} color="#EB7257" />
            )}
          </div>
          <div className="group-hover:opacity-0 absolute z-10 bottom-2 left-5 bg-destructive text-white text-xs font-semibold px-2 py-1 rounded-3xl">
            {card?.publishStatus}
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
          {card?.publishStatus}
        </p>
        <h2 className="text-lg md:text-xl font-bold font-pally-medium">
          {card?.eventName?.length > 25
            ? card?.eventName.slice(0, 25).concat("...")
            : card?.eventName}
        </h2>
        <p className="text-sm md:text-lg text-slate-200 font-pally-regular">
          {card?.locationType === "physical"
            ? card?.physicalLocation?.address
            : "Online"}
        </p>
      </div>
      <p className="p-3 text-lg md:text-xl text-white font-bold font-pally-medium">
        {card?.eventName?.length > 25
          ? card?.eventName.slice(0, 25).concat("...")
          : card?.eventName}
      </p>
    </div>
  );
};

export default CardComponent2;
