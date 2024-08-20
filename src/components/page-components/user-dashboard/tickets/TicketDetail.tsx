import TicketIcon from "@/components/icons/ticket";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import { CardProps } from "@/static-datas/cards-data";
import Image from "next/image";
import React from "react";

const TicketDetail: React.FC<CardProps> = ({ title, location, date }) => {
  return (
    <div>
      <div className="rounded-lg border p-3 w-96 h-72">
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
      <div className="mt-6">
        <h6 className="text-sm md:text-base font-pally-medium text-[#515A6A]">
          Meet your Organizer
        </h6>

        <div className="mt-4 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Image
              src={`/images/seagreen-bg.png`}
              width={456}
              height={280}
              alt={`ticket name`}
              className="pointer-events-none w-16 h-16 object-cover rounded-full"
            />
            <div className="space-y-1">
              <p className="text-sm md:text-base font-pally-medium">
                Hosted by Alpha Planners
              </p>
              <ul className="flex text-sm md:text-base text-[#667185] gap-4  font-pally-regular">
                <li className="underline">Twitter</li>
                <li className="underline">LinkedIn</li>
              </ul>
              <p className="font-pally-regular text-sm md:text-base text-[#0F973D]">
                369 people are following this host
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            follow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
