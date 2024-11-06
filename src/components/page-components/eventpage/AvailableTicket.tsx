import React from "react";
import Ticket from "./ticket";
import { availableTickets } from "@/static-datas/ticketsData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { calculateDuration } from "@/lib/utils";

const AvailableTicket: React.FC<{ id: string; event: any }> = ({
  id,
  event,
}) => {
  const getEntryTicketCountdown = () => {
    const now = new Date();

    if (event?.ticketCategory === "entry" && event.entryTicket?.startDate) {
      const startDate = new Date(event.entryTicket.startDate);
      const timeDifference = startDate.getTime() - now.getTime();
      const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      return daysRemaining > 0 ? daysRemaining : 0;
    }
    return null;
  };

  const getFirstTicketCountdown = (groupedTicket: any[]) => {
    if (!Array.isArray(groupedTicket) || groupedTicket.length === 0) {
      return null; // Return null if groupedTicket is not an array or is empty
    }

    const now = new Date();
    const firstTicketStartDate = new Date(groupedTicket[0].startDate);
    const timeDifference = firstTicketStartDate.getTime() - now.getTime();

    // Calculate the countdown in days
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysRemaining > 0 ? daysRemaining : 0; // Return 0 if the start date has passed
  };

  return (
    <div className="mb-6 mt-8 lg:flex justify-end w-full max-w-xl hidden">
      <div>
        <div className="flex items-center gap-5">
          <h6 className="font-pally-medium text-[#515A6A] text-base md:text-lg">
            AVAILABLE TICKETS
          </h6>
          <p className="rounded-3xl text-sm text-[#523300] font-pally-medium px-2 py-1 bg-[#F7D394]">
            {`Ticket sales ending in
             ${
               (event?.ticketCategory === "entry" &&
                 getEntryTicketCountdown()) ||
               getFirstTicketCountdown(event?.groupedTicket)
             }
              days`}
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

          <Link href={`/explore-events/${id}/checkout`}>
            <Button
              variant="destructive"
              size="lg"
              className="mt-5 w-full py-3"
            >
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AvailableTicket;
