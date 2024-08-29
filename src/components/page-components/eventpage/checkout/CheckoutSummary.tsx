import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import Image from "next/image";
import React from "react";

const CheckoutSummary = () => {
  return (
    <div className="rounded-lg border p-3 w-full max-w-md">
      <Image
        src={`/images/seagreen-bg.png`}
        width={456}
        height={280}
        alt={`ticket name`}
        className="pointer-events-none w-full h-[228px] object-cover rounded-lg"
      />

      <div className="mt-4 space-y-4">
        <div className=" space-y-1">
          <p className="text-[#586170] text-sm md:text-base font-pally-medium">
            Vibes Barn - Jiggy in Jean (Denim themed party)
          </p>
          <p className="text-[#586170] text-sm font-pally-regular">
            70C Bennet Bassey Esau Street, Ewet Housing, Uyo
          </p>
          <p className="text-[#586170] text-sm font-pally-regular">
            Sun, July 28 2024, 10:00 PM
          </p>
        </div>

        <Separator />

        <div className="space-y-1.5">
          <p className="text-sm md:text-base font-pally-medium">
            Order summary
          </p>
          <div className="flex justify-between">
            <p className="text-[#586170] text-sm font-pally-regular">
              1 x Barn Member
            </p>
            <p className="text-[#586170] text-sm font-pally-regular">
              {toFiat(3000)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#586170] text-sm font-pally-regular">
              2 x Barn Member
            </p>
            <p className="text-[#586170] text-sm font-pally-regular">
              {toFiat(25000)}
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex justify-between">
            <p className=" text-base font-pally-regular">
              Total
            </p>
            <p className=" text-base font-pally-regular">
              {toFiat(28000)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
