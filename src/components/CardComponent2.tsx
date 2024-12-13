import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CardComponent2: FC<{ card: any }> = ({ card }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/explore-events/${id}`);
  };
  return (
    <div
      onClick={() => handleCardClick(card?._id)}
      className="flex flex-col w-[25%] xs:max-md:min-w-[230px] bg-[#221A14] rounded-2xl cursor-pointer"
    >
      <div className="group relative inline-block overflow-hidden rounded-2xl">
        <button className="w-full aspect-square xs:max-md:max-h-[300px] block overflow-hidden">
          <figure className="relative size-full">
            <div className="group-hover:opacity-0 absolute z-10 bottom-2 left-5 bg-destructive text-white text-xs font-semibold px-2 py-1 rounded-3xl uppercase">
              {card?.publishStatus}
            </div>
            <Image
              fill={true}
              src={card?.thumbnail ?? "/images/blue-bg.png"}
              alt={card?.eventName || "Event image"}
              className="object-cover"
            />
          </figure>
        </button>
        {/* The hover card */}
        <div className="rounded-2xl appear z-10 hidden backdrop-blur-[2px] px-5 py-1 font-pally-regular text-white justify-center items-start w-full h-full top-0 group-hover:flex flex-col group-hover:absolute bg-black bg-opacity-50 space-y-3">
          <p className="inline-flex bg-destructive text-white text-xs font-pally-regular px-2 py-1 rounded-3xl uppercase">
            {card?.publishStatus}
          </p>
          <h2 className="text-lg md:text-2xl font-pally-medium">
            {card?.eventName?.length > 25
              ? card?.eventName.slice(0, 25).concat("...")
              : card?.eventName}
          </h2>
          <p className="text-sm md:text-md text-slate-200 font-pally-regular">
            {card?.locationType === "physical"
              ? card?.physicalLocation?.address?.slice(0, 26).concat("...")
              : "Online"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-between p-4">
        <p className=" text-sm md:text-lg text-white font-bold font-pally-medium">
          {card?.eventName?.length > 25
            ? card?.eventName.slice(0, 25).concat("...")
            : card?.eventName}
        </p>
        <div
          onClick={() => setIsFavorite(!isFavorite)}
          className=" bg-white text-white p-1 md:p-2 rounded-full cursor-pointer"
        >
          {!isFavorite ? (
            <RiHeartLine color="#000" className="text-sm md:text-lg" />
          ) : (
            <RiHeartFill className="destructive text-sm md:text-lg" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComponent2;
