import React, { useCallback, useState } from "react";
import Ticket from "./ticket";
import { availableTickets } from "@/static-datas/ticketsData";

const AvailableTicket = () => {
  const [counters, setCounters] = useState(availableTickets.map(() => 0));

  const handleIncrement = (index: number, maxCount: number) => {
    setCounters((prev) =>
      prev.map((count, i) =>
        i === index && count < maxCount ? count + 1 : count
      )
    );
  };

  const handleDecrement = (index: number) => {
    setCounters((prev) =>
      prev.map((count, i) => (i === index && count > 0 ? count - 1 : count))
    );
  };
  return (
    <div className="mb-6 mt-8 flex justify-end w-full max-w-xl">
      <div className="">
        <div className="flex items-center gap-5">
          <h6 className="font-pally-medium text-[#515A6A] text-base md:text-lg">
            AVAILABLE TICKETS
          </h6>
          <p className="rounded-3xl text-sm text-[#523300] font-pally-medium px-2 py-1 bg-[#F7D394]">
            Ticket sales ending in 3 days
          </p>
        </div>

        <div className="mt-7 w-96 space-y-5">
          {availableTickets.map((ticket) => (
            <Ticket
              key={ticket.id}
              price={ticket.price}
              ticketName={ticket.ticketName}
              image={ticket.image}
              maxCount={ticket.maxCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableTicket;
