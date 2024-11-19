import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import React, { FC } from "react";

const TicketPlacement:FC<{text:string}> = ({text}) => {

  return (
    <div className="bg-[#211913] p-3 rounded-lg w-56 space-y-3">
      <div className="flex items-center gap-3">
        <p className="text-sm text-white font-pally-regular whitespace-nowrap">
          Ticket Sales
        </p>
        <Progress value={20} />
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-sm text-[#D0D5DD] font-pally-regular whitespace-nowrap">
          Ticket Sales
        </p>

        <p className="flex items-center gap-1.5 text-sm font-pally-regular text-[#D0D5DD]">
          {text}
        </p>
      </div>
    </div>
  );
};

export default TicketPlacement;
