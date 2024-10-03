import TicketIcon from "@/components/icons/ticket";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import { CardProps } from "@/static-datas/cards-data";
import Image from "next/image";
import React from "react";
import MeetYourOganiser from "../MeetYourOganiser";

const TicketDetail: React.FC<CardProps> = ({ id,title, location, date }) => {
  return (
    <div>
      <div className="rounded-lg border p-3 w-full max-w-96 h-72">
        <Image
          src={`/images/seagreen-bg.png`}
          width={456}
          height={280}
          alt={`ticket name`}
          className="pointer-events-none w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="space-y-2 my-6">
        <p className="text-[#586170] text-sm md:text-base font-pally-regular">
          {location}
        </p>
        <p className="destructive text-sm font-pally-regular">{date}</p>
        <div className="flex items-center gap-1 mt-3">
          <TicketIcon />{" "}
          <p className="text-base text-black font-pally-medium">
            {toFiat(7000)}
          </p>
        </div>
      </div>

      <Separator />

      {/* Oganiser */}
      <MeetYourOganiser />
    </div>
  );
};

export default TicketDetail;
