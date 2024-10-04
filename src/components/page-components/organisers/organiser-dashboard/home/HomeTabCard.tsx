import Image from "next/image";
import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { TabProgress } from "./TabProgress";

const HomeTabCard = () => {
  return (
    <div className="border rounded-xl p-4 md:p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={"/images/blue-bg.png"}
          alt="event"
          width={160}
          height={134}
          className="rounded-lg pointer-events-none object-cover w-40 h-32"
        />
        <div className=" h-full space-y-3">
          <p className="font-pally-medium text-[#2C2B2E] text-base md:text-xl">
            Designer’s Connect
          </p>
          <p className="font-pally-regular text-[#586170]">
            Starts{" "}
            <span className="font-pally-medium text-[#3D89DF]">
              April 1st , 2023
            </span>{" "}
            at <span className="font-pally-medium text-[#3D89DF]">7:00 am</span>
          </p>
          <div className="flex items-center gap-2">
            <p className="text-[#667185] whitespace-nowrap font-pally-regular text-base">
              Ticket Sale
            </p>
            <div className=" w-52">
              <TabProgress value={2} max={60} />
            </div>
            <p className="text-[#667185] whitespace-nowrap font-pally-regular">
              2/40
            </p>
          </div>
        </div>
      </div>
      <div className="border border-gray-100 cursor-pointer rounded-lg p-5 space-y-2 flex flex-col items-center">
        <BsGraphUpArrow size={28} color="#D9302A" />
        <p className="text-[#D9302A] font-pally-medium text-lg underline">
          View Stat
        </p>
      </div>
    </div>
  );
};

export default HomeTabCard;
