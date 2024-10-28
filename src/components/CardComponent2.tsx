import Image from "next/image";
import React from "react";
import { RiHeartLine } from "react-icons/ri";

const CardComponent2 = () => {
  return (
    <div className="group relative inline-block bg-white rounded-[10%] overflow-hidden ">
      <button className="w-[25vw] aspect-square rounded-[10%] block overflow-hidden p-[1px]">
        <figure className="relative size-full">
          <div className="absolute z-10 top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer">
            <RiHeartLine size={24} />
          </div>
          <div className="absolute z-10 bottom-2 left-5 bg-destructive text-white text-xs font-semibold px-2 py-1 rounded-3xl">
            GRILL FEST
          </div>
          <Image
            fill={true}
            src="/images/corn.jpg"
            alt="corn"
            className="object-cover"
          />
        </figure>
      </button>
      <div className="appear hidden backdrop-blur px-5 py-1 font-pally-regular text-white items-center justify-center z-10 w-full h-full top-0 group-hover:flex group-hover:absolute bg-black bg-opacity-50 ">
        <p>ABUJA GRILL FEST</p>
      </div>
      <p className="px-5 py-1 font-pally-regular">ABUJA GRILL FEST</p>
    </div>
  );
};

export default CardComponent2;
