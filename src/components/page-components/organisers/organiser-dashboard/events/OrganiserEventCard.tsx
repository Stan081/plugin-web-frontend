"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import React from "react";
import { SlLocationPin } from "react-icons/sl";
import { TfiWorld } from "react-icons/tfi";
import { TabProgress } from "../home/TabProgress";

const OrganiserEventCard = () => {
  const ticketSale: number = 5;
  const totalTicket: number = 20;
  return (
    <div className="w-full max-w-md shrink-0 rounded-xl overflow-hidden bg-white border border-gray-200 p-4">
      <div className="relative">
        <Image
          className="w-full h-48 md:h-72 object-cover rounded-lg"
          src={
            "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image3.jpeg?updatedAt=1722389364580"
          }
          alt="yyi"
          width={300}
          height={200}
        />
        <div className="absolute top-2 left-2 ">
          <p className="bg-[#2F80ED] text-white text-xs font-pally-regular px-2 py-1 rounded-3xl">
            Published
          </p>
          <Popover>
            <PopoverTrigger>
              <p className="text-[#586170] font-pally-regular text-base md:text-lg flex items-center hover:underline whitespace-nowrap"></p>
            </PopoverTrigger>
            <PopoverContent className="w-96 bg-white rounded-xl p-3">
                <ul>
                    <li></li>
                </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div
        //   onClick={() => handleCardClick(id)}
        className="py-4 cursor-pointer  hover:bg-gray-100 transition delay-75 ease-in-out space-y-3"
      >
        <h2 className="text-lg md:text-xl font-bold font-pally-medium">
          {/* {title.length > 16 ? title.slice(0, 16).concat("...") : title} */}{" "}
          Sip and paint with Wakky taisk
        </h2>
        <p className="text-sm md:text-base text-[#667185]">
          Saturday , September 7th, 2023 @ 7:30pm GMT
        </p>

        <div className="flex items-center gap-4">
          <p className="text-sm md:text-base text-[#667185] flex items-center gap-2">
            <SlLocationPin /> Lagos, Nigeria
          </p>
          <div className="w-3 rotate-90  border-b-2 border-[#667185]" />
          <p className="text-sm md:text-base text-[#667185] flex items-center gap-2">
            <TfiWorld /> Private view
          </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-[#667185] whitespace-nowrap font-pally-regular text-base">
            Total sold
          </p>
          <div className=" w-52">
            <TabProgress value={ticketSale} max={totalTicket} />
          </div>
          <p className="text-[#667185] whitespace-nowrap font-pally-regular">
            {ticketSale}/{totalTicket}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganiserEventCard;
