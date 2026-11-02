import Image from "next/image";
import React, { FC } from "react";

const TicketPlacement: FC<{
  text: string;
  color?: string;
  seatmap?: string;
}> = ({ text, color, seatmap }) => {
  return (
    <div className="bg-[#362c24] p-3 rounded-lg w-full space-y-3 break-words">
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
          className="pointer-events-none w-auto max-w-full h-auto"
        />
      )}
      <div className="space-y-4">
        <p className="text-sm lg:text-base text-white font-pally-medium whitespace-nowrap underline">
          Ticket Perks
        </p>

        <p className="flex items-center gap-1.5 text-sm font-pally-regular text-[#D0D5DD]">
          {text}
        </p>
      </div>
    </div>
  );
};

export default TicketPlacement;
