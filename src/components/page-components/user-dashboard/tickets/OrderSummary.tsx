import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import React, { useState } from "react";
import ReceiptModal from "../ReceiptModal";

const OrderSummary = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="mt-4 bg-[#F9F7F7] px-4 py-5 rounded-lg space-y-4">
      <div className="flex items-center gap-2">
        {" "}
        <p className="bg-[#BAE9CA] font-pally-medium py-1 px-2 text-center text-sm md:text-base rounded-xl text-[#099137] whitespace-nowrap">
          Paid ticket
        </p>
        <div className="w-1 h-1 bg-gray-500 rounded-full" />
        <p className=" font-pally-regular text-[#515A6A] text-sm md:text-base">
          Orderd by Lauren Madison (laurenmadison1@mail.com)
        </p>
      </div>
      <p className=" font-pally-regular text-[#515A6A] text-sm md:text-base">
        Oct 15, 2022 at 4:20PM (WAT)
      </p>
      <div className="flex items-center gap-2">
        {" "}
        <p className="font-pally-regular text-[#515A6A] text-sm md:text-base">
          3 tickets
        </p>
        <div className="w-1 h-1 bg-gray-500 rounded-full" />
        <p className=" font-pally-medium text-base md:text-lg ">
          {toFiat(20300)}
        </p>
      </div>

      <Separator />

      <div className="mt-6 flex items-center justify-between">
        <p className=" font-pally-medium text-[#515A6A] text-sm md:text-base">
          Order #1242801
        </p>
        <Button onClick={() => setIsOpen(!isOpen)} variant="outline" size="sm">
          View receipt
        </Button>
      </div>
      <ReceiptModal open={isOpen} close={() => setIsOpen(!isOpen)} />
    </div>
  );
};

export default OrderSummary;
