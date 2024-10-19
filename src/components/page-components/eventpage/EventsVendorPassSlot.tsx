import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

type SlotPropsType = {
    title: string,
    unitPrice: string;
    slotsLeft: string
}

const EventsVendorPassSlot = ({title, unitPrice, slotsLeft}: SlotPropsType) => {
  return (
    <div className="h-[15vh] md:h-[20vh] flex border border-[#E8E8E8] rounded-xl">
      <div className="h-full w-[15%] md:w-[10%] bg-[#F8F6F6]"></div>
      <div className="h-full w-[85%] md:w-[90%] flex flex-col justify-between">
        <div className="h-[60%] flex items-center justify-between px-5">
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
        <div className="h-[40%] flex items-center justify-between px-5">
          <p className="font-pally-medium text-lg md:text-xl text-[#101928]">
            #{unitPrice}
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
