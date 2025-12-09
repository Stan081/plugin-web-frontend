import React, { useEffect } from "react";
import GroupedTicket from "./GroupedTicket";
import EntryTicketComponent from "./EntryTicketComponent";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEventsContext } from "@/providers/events.provider";

const AvailableTicket: React.FC<{
  id: string;
  event: any;
  isPassed: boolean;
}> = ({ id, event, isPassed }) => {
  const { tickets, setCounter, setTickets } = useEventsContext();

  useEffect(() => {
    setCounter(0);
    setTickets([]);
  }, []);

  const router = useRouter();

  const handleGroupTicket = () => {
    if (tickets.length > 0) {
      router.push(`/explore-events/${id}/checkout`);
    }
  };


  return (
    <div className="mb-6 mt-8 lg:block md:w-2/6 hidden">
      <div className="flex items-center gap-5">
        <h6 className="font-pally-medium text-[#515A6A] text-base md:text-lg">
          AVAILABLE TICKETS
        </h6>
        {/* {event?.ticketCategory === "entry" && (
          <p className="rounded-3xl text-sm text-[#523300] font-pally-medium px-2 py-1 bg-[#F7D394]">
            {`Ticket sales ending in
             ${getEntryTicketCountdown()}
              days`}
          </p>
        )} */}
      </div>
      
      <div className="mt-7 w-full space-y-5">
        {event?.ticketCategory === "grouped" && (
          <>
            {event?.groupedTicket.map((ticket) => (
              <GroupedTicket key={ticket._id} id={id} groupedTicket={ticket} />
            ))}
            <Button
              onClick={handleGroupTicket}
              variant="destructive"
              size="lg"
              disabled={tickets.length === 0}
              className="mt-5 w-full py-3"
            >
              Checkout
            </Button>
          </>
        )}

        {event?.ticketCategory === "entry" && (
          <EntryTicketComponent entryTicket={event?.entryTicket} id={id} isPassed={isPassed} />
        )}
      </div>
    </div>
  );
};

export default AvailableTicket;
