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
    <div className="h-auto border border-[#E8E8E8] rounded-xl flex-shrink-0 w-full max-w-[280px]">
      <div className="flex justify-between items-center">
        {thumbnail ? (
          <img
            className="w-28 h-28 object-cover rounded-lg"
            src={thumbnail ?? "/images/blue-bg.png"}
            alt={title || "Event Vendor"}
            width={300}
            height={200}
          />
        ) : (
          <div className=" md:h-full w-[15%] md:w-[20%] bg-[#F8F6F6] rounded-l-xl"></div>
        )}
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 mr-5"
        >
          Buy Pass
        </Button>
      </div>
      <div className="flex flex-col justify-between">
        <div className="h-auto md:h-[60%] flex items-center justify-between px-3 py-4">
          <p className="font-pally-medium text-base md:text-lg text-[#101928]">
            {title}
          </p>
        </div>
        <Separator />
        <div className="h-auto md:h-[40%] flex items-center justify-between px-5 py-3">
          <p className="font-pally-medium text-lg md:text-xl text-[#101928]">
            {toFiat(unitPrice)}
            <span className="ml-1 font-pally-regular text-sm text-gray-500">
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
