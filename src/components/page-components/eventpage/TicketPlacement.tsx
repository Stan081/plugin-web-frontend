import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { FC } from "react";

const TicketPlacement: FC<{
  text: string;
  color?: string;
  seatmap?: string;
}> = ({ text, color, seatmap }) => {
  return (
    <div className="bg-[#362c24] p-3 rounded-lg w-72 space-y-3">
      {color && (
        <h4 className="font-pally-medium text-white flex items-center gap-2">
          Ticket Placement{" "}
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
        </h4>
      )}
      {seatmap && (
        <Image
          src={seatmap}
          width={200}
          height={120}
          alt={text}
          className="pointer-events-none w-auto h-auto"
        />
      )}
      <div className="space-y-4">
        <p className="text-sm lg:text-base text-white font-pally-medium whitespace-nowrap underline">
          Ticket Peaks
        </p>

        <p className="flex items-center gap-1.5 text-sm font-pally-regular text-[#D0D5DD]">
          {text}
        </p>
      </div>
    </div>
  );
};

export default TicketPlacement;
