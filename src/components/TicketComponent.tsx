import React, { Fragment } from "react";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { RiArrowRightLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { CardProps } from "@/static-datas/cards-data";
import CardEmptyState from "./page-components/organisers/organiser-dashboard/home/CardEmptyState";

interface TicketComponentProps {
  tickets: CardProps[];
}

export const formatDate = (dateString: string) => {
  const options: unknown = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};
const TicketComponent: React.FC<TicketComponentProps> = ({ tickets }) => {
  // initailise router
  const router = useRouter();

  //Handle click events
  // const handleClick = (id: string, createdAt: Date) => {
  //   router.push(`/tickets/${id}`);
  // };

  const handleClick = (id: string) => {
    router.push({
      pathname: `/tickets/${id}`,
      // query: { createdAt: createdAt },
    });
  };

  console.log(tickets)

  return (
    <div>
      {tickets?.length !== 0 ? (
        tickets?.map((tick, index) => (
          <Fragment key={index}>
            <div className="flex items-start justify-between py-5">
              <div className="flex gap-3 md:gap-5">
                <div className="w-24 h-24 md:w-32">
                  {tick.thumbnail && (
                    <Image
                      src={tick.thumbnail ?? `/images/seagreen-bg.png`}
                      width={124}
                      height={106}
                      alt={tick?.eventName}
                      className="pointer-events-none w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <h5 className="text-base md:text-lg font-pally-medium">
                    {tick?.eventName?.length > 16
                      ? tick?.eventName.slice(0, 16).concat("...")
                      : tick?.eventName}
                  </h5>
                  <p className="text-[#586170] text-sm font-pally-regular capitalize">
                    {tick?.locationType}
                  </p>
                  <p className="destructive text-sm font-pally-regular">
                    {formatDate(tick?.oneTimeEvent?.startDate)}
                  </p>
                </div>
              </div>
              <div
                onClick={() => handleClick(tick?._id)}
                className="flex items-center gap-1 md:gap-2 cursor-pointer hover:text-gray-600"
              >
                <p className="underline font-pally-medium whitespace-nowrap text-sm md:text-base">
                  View Ticket
                </p>
                <RiArrowRightLine size={20} />
              </div>
            </div>
            {index !== tickets.length - 1 && <Separator />}
          </Fragment>
        ))
      ) : (
        <CardEmptyState text="No record on transaction" />
      )}
    </div>
  );
};

export default TicketComponent;
