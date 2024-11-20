import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import React, { FC } from "react";

const TicketPlacement:FC<{text:string}> = ({text}) => {

  return (
    <div className="bg-[#211913] p-3 rounded-lg w-56 space-y-3">

      <div className="space-y-4">
        <p className="text-sm text-[#D0D5DD] font-pally-regular whitespace-nowrap">
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
