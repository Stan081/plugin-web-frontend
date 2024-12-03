import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import React from "react";

type SlotPropsType = {
  title: string;
  unitPrice: number;
  slotsLeft: string;
};

const EventsVendorPassSlot = ({
  title,
  unitPrice,
  slotsLeft,
}: SlotPropsType) => {
  return (
    <div className="h-auto border border-[#E8E8E8] rounded-xl flex-shrink-0 w-full max-w-[300px]">
      <div className="flex flex-col justify-between">
        <div className="h-auto md:h-[60%] flex items-center justify-between px-3 py-4 gap-4">
          <p className="font-pally-medium text-base md:text-lg text-[#101928]">
            {title}
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-1.5"
          >
            Buy Pass
          </Button>
        </div>
        <Separator />
        <div className="h-auto md:h-[40%] flex items-center justify-between px-3 py-3">
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
