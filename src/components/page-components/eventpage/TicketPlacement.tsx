import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { TiTick } from "react-icons/ti";

const TicketPlacement = () => {
  // temp data
  const ticketfeature = [
    "Access to the barn Area",
    "Access to DANCE HALL",
    "GIVE ACCESS TO ONE PERSON",
  ];
  return (
    <div className="bg-[#211913] p-3 rounded-lg w-56 space-y-3">
      <div className="flex items-center gap-3">
        <p className="text-sm text-white font-pally-regular whitespace-nowrap">
          Ticket Sales
        </p>
        <Progress value={20} />
      </div>

      <Separator />

      <div>
        <p className="text-sm text-[#D0D5DD] font-pally-regular whitespace-nowrap">
          Ticket Sales
        </p>

        <ul>
          {ticketfeature.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-1.5 text-sm font-pally-regular text-[#D0D5DD]"
            >
              <TiTick color="#F7C164"/>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicketPlacement;
