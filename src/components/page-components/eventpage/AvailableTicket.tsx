import React from "react";
import GroupedTicket from "./GroupedTicket";
import EntryTicketComponent from "./EntryTicketComponent";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AvailableTicket: React.FC<{ id: string; event: any }> = ({
  id,
  event,
}) => {
  const getEntryTicketCountdown = () => {
    const now = new Date();

    if (event?.ticketCategory === "entry" && event?.entryTicket) {
      const { startDate, endDate } = event.entryTicket;

      // Validate startDate and endDate
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && isNaN(start.getTime())) {
        console.error("Invalid startDate format.");
        return null;
      }

      if (end && isNaN(end.getTime())) {
        console.error("Invalid endDate format.");
        return null;
      }

      // Check if the current date is before the start date
      if (start && now < start) {
        const timeDifference = start.getTime() - now.getTime();
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return Math.max(daysRemaining, 0); // Time remaining until the start date
      }

      // Check if the current date is between the start and end dates
      if (end && now <= end) {
        const timeDifference = end.getTime() - now.getTime();
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return Math.max(daysRemaining, 0); // Time remaining until the end date
      }

      // If the event is past its end date
      return 0;
    }

    return null;
  };
  const router  = useRouter()

  const checkIfEndDateReached = () => {
    if (event?.entryTicket?.endDate) {
      const endDate = new Date(event.entryTicket.endDate);

      // Validate endDate
      if (isNaN(endDate.getTime())) {
        console.error("Invalid endDate format.");
        return false;
      }

      // Get the current date and time
      const now = new Date();

      // Compare dates
      const isSameDay =
        now.getUTCFullYear() === endDate.getUTCFullYear() &&
        now.getUTCMonth() === endDate.getUTCMonth() &&
        now.getUTCDate() === endDate.getUTCDate();

      return isSameDay;
    }

    return false;
  };

  console.log(checkIfEndDateReached());

  return (
    <div className="mb-6 mt-8 lg:block w-full max-w-lg hidden">
      <div className="flex items-center gap-5">
        <h6 className="font-pally-medium text-[#515A6A] text-base md:text-lg">
          AVAILABLE TICKETS
        </h6>
        {event?.ticketCategory === "entry" && (
          <p className="rounded-3xl text-sm text-[#523300] font-pally-medium px-2 py-1 bg-[#F7D394]">
            {`Ticket sales ending in
             ${getEntryTicketCountdown()}
              days`}
          </p>
        )}
      </div>

      <div className="mt-7 w-full space-y-5">
        {event?.ticketCategory === "grouped" && (
          <>
            {event?.groupedTicket.map((ticket) => (
              <GroupedTicket key={ticket._id} id={id} groupedTicket={ticket} />
            ))}
            <Button
              onClick={() => router.push(`/explore-events/${id}/checkout`)}
              variant="destructive"
              size="lg"
              // disabled={counter === 0}
              className="mt-5 w-full py-3"
            >
              Checkout
            </Button>
          </>
        )}

        {checkIfEndDateReached && event?.ticketCategory === "entry" && (
          <EntryTicketComponent entryTicket={event?.entryTicket} id={id} />
        )}
      </div>
    </div>
  );
};

export default AvailableTicket;
