import React from "react";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { RiArrowRightLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { CardProps } from "@/static-datas/cards-data";

const TicketComponent: React.FC<CardProps> = (prop) => {
  const { id, image, title, location, date } = prop;
  // initailise router
  const router = useRouter();

  //Handle click events
  const handleClick = (id: string) => {
    router.push(`/tickets/${id}`);
  };

  return (
    <div>
      <div className="flex items-start justify-between py-5">
        <div className="flex gap-3 md:gap-5">
          <Image
            src={`${image}` ?? `/images/seagreen-bg.png`}
            width={124}
            height={106}
            alt={`name`}
            className="pointer-events-none w-32 h-24 object-cover rounded-lg"
          />
          <div className="space-y-2">
            <h5 className="text-base md:text-lg font-pally-medium">{title}</h5>
            <p className="text-[#586170] text-sm font-pally-regular">
              {location}
            </p>
            <p className="destructive text-sm font-pally-regular">{date}</p>
          </div>
        </div>
        <div
          onClick={() => handleClick(id)}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-600"
        >
          <p className="underline font-pally-medium">View Ticket</p>
          <RiArrowRightLine size={20} />
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default TicketComponent;
