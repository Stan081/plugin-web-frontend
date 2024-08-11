import React, { Fragment } from "react";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { RiArrowRightLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { CardProps } from "@/static-datas/cards-data";

interface TicketComponentProps {
  tickets: CardProps[];
}

const TicketComponent: React.FC<TicketComponentProps> = ({ tickets }) => {
  // initailise router
  const router = useRouter();

  //Handle click events
  const handleClick = (id: string) => {
    router.push(`/tickets/${id}`);
  };

  return (
    <div>
      {tickets.map((tick, index) => (
        <Fragment key={index}>
          <div className="flex items-start justify-between py-5">
            <div className="flex gap-3 md:gap-5">
              <Image
                src={`${tick?.image}` ?? `/images/seagreen-bg.png`}
                width={124}
                height={106}
                alt={`name`}
                className="pointer-events-none w-32 h-24 object-cover rounded-lg"
              />
              <div className="space-y-2">
                <h5 className="text-base md:text-lg font-pally-medium">
                  {tick?.title}
                </h5>
                <p className="text-[#586170] text-sm font-pally-regular">
                  {tick?.location}
                </p>
                <p className="destructive text-sm font-pally-regular">
                  {tick?.date}
                </p>
              </div>
            </div>
            <div
              onClick={() => handleClick(tick?.id)}
              className="flex items-center gap-2 cursor-pointer hover:text-gray-600"
            >
              <p className="underline font-pally-medium">View Ticket</p>
              <RiArrowRightLine size={20} />
            </div>
          </div>
          {index !== tickets.length - 1 && <Separator />}
        </Fragment>
      ))}
    </div>
  );
};

export default TicketComponent;
