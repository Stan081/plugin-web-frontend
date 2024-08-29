import TicketIcon from "@/components/icons/ticket";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import Image from "next/image";
import React from "react";

const TicketVoucher = () => {
  return (
    <div className="border px-4 py-5 rounded-lg space-y-4 mt-3">
      <div className="flex justify-between items-end md:items-center mb-6">
        <div className="flex items-center gap-1 mt-3">
          <TicketIcon />{" "}
          <p className="text-sm whitespace-nowrap text-black font-pally-medium">
            TKT-2347FG790B
          </p>
        </div>
        <p className="text-sm font-pally-medium text-[#98A2B3]">
          Thu, 1st Jan 2019 01:00:00
        </p>
      </div>
      <Separator />
      <div className="flex justify-between items-center gap-6 mt-8">
        <div className="w-full max-w-sm">
          <h6 className="font-pally-medium text-lg">Ticket vouchers</h6>
          <div className="mt-10 flex justify-between">
            <p className="text-sm md:text-base text-[#515A6A] font-pally-regular">
              Ticket Type:
            </p>
            <p className="text-sm md:text-base text-[#515A6A] font-pally-medium">
              Barn Member
            </p>
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-sm md:text-base text-[#515A6A] font-pally-regular">
              Price/ ticket
            </p>
            <p className="text-sm md:text-base text-[#515A6A] font-pally-medium">
              {toFiat(30000)}
            </p>
          </div>
          <div className="my-4 flex justify-between">
            <p className="text-sm md:text-base text-[#515A6A] font-pally-regular">
              Quantity ordered
            </p>
            <p className="text-sm md:text-base text-[#515A6A] font-pally-medium">
              1
            </p>
          </div>

          <Separator />
          <div className="my-4 flex justify-between">
            <p className="text-base text-[#515A6A] font-pally-medium">Total</p>
            <p className="text-base text-[#515A6A] font-pally-medium">
              {toFiat(30000)}
            </p>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-[#F5F7F9]">
          <Image
            src={"/images/barcode.svg"}
            width={156}
            height={173}
            alt="barcode"
            className="w-auto h-auto pointer-events-none rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketVoucher;
