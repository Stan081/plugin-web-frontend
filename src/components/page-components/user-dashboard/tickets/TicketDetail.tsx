import TicketIcon from "@/components/icons/ticket";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import Image from "next/image";
import React from "react";
import MeetYourOganiser from "../MeetYourOganiser";
import { formatDate } from "@/components/TicketComponent";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TicketDetail: React.FC<{ event: any; tickets: any }> = ({
  event,
  tickets,
}) => {
  const startDate: string =
    event?.oneTimeEvent?.startDate || event?.recurringEvent?.startDate;

  const totalPrice = tickets?.reduce(
    (sum, ticket) => sum + ticket?.ticketData?.price,
    0
  );

  return (
    <div>
      <div className="rounded-lg border p-3 w-full max-w-96 h-72">
        <Image
          src={event?.thumbnail}
          width={456}
          height={280}
          alt={`ticket name`}
          className="pointer-events-none w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="space-y-2 my-6">
        <p className="text-[#586170] text-sm md:text-base font-pally-regular">
          {event?.location === "physical"
            ? event?.physicalLocation?.address
            : "Online"}
        </p>
        <p className="destructive text-sm font-pally-regular">
          {formatDate(startDate)}
        </p>
        <div className="flex items-center gap-1 mt-3">
          <TicketIcon />{" "}
          <p className="text-base text-black font-pally-medium">
            {toFiat(totalPrice)}
          </p>
        </div>
      </div>

      <Separator />

      {/* Oganiser */}
      <MeetYourOganiser organiserId={event?.userId} />
    </div>
  );
};

export default TicketDetail;
