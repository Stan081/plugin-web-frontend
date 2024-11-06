import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import React from "react";

type SlotPropsType = {
  title: string;
  unitPrice: number;
  slotsLeft: string;
  thumbnail?: string;
};

const EventsVendorPassSlot = ({
  title,
  unitPrice,
  slotsLeft,
  thumbnail,
}: SlotPropsType) => {
  return (
    <div className="h-auto md:h-[20vh] flex border border-[#E8E8E8] rounded-xl">
      {thumbnail ? (
        <div className=" md:h-full w-[15%] md:w-[20%] bg-[#F8F6F6] ">
          <img
            className="w-full h-full object-cover rounded-tl-xl rounded-bl-xl"
            src={thumbnail ?? "/images/blue-bg.png"}
            alt={title || "Event Vendor"}
            width={300}
            height={200}
          />
        </div>
      ) : (
        <div className=" md:h-full w-[15%] md:w-[20%] bg-[#F8F6F6] rounded-l-xl"></div>
      )}
      <div className="h-full w-[85%] md:w-[90%] flex flex-col justify-between">
        <div className="h-auto md:h-[60%] flex items-center justify-between px-5 py-4">
          <p className="font-pally-regular text-lg md:text-2xl text-[#101928]">
            {title}
          </p>
          <div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5"
            >
              Buy Pass
            </Button>
          </div>
        </div>
        <Separator />
        <div className="h-auto md:h-[40%] flex items-center justify-between px-5 py-3">
          <p className="font-pally-medium text-lg md:text-xl text-[#101928]">
            {toFiat(unitPrice)}
            <span className="ml-1 font-pally-regular text-sm md:text-base text-[rgba(0,0,0,0.5)] ">
              per pass
            </span>
          </p>
          <div className="py-1 px-2 md:px-3 border border-[rgba(0,0,0,0.08)] bg-[#F8F6F6] rounded-3xl">
            <p className="font-pally-medium text-xs text-[#101928]">
              {slotsLeft} Slots Left
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsVendorPassSlot;
