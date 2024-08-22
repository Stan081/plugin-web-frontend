import React from "react";
import Ticket from "./ticket";
import { availableTickets } from "@/static-datas/ticketsData";
import { Button } from "@/components/ui/button";

const AvailableTicket = () => {
  return (
    <div className="mb-6 mt-8 lg:flex justify-end w-full max-w-xl hidden">
      <div>
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

          <Button variant="destructive" size="lg" className="mt-5 w-full py-3">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvailableTicket;
