import React, { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useEventsContext } from "@/providers/events.provider";
import EntryTicketComponent from "./EntryTicketComponent";
import GroupedTicket from "./GroupedTicket";
import { toFiat } from "@/lib/amount";
import { Dialog, DialogPanel,} from "@headlessui/react";

const TicketCTA: React.FC<{ event: any; id: string }> = ({ event, id }) => {
  const { tickets } = useEventsContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
  const router = useRouter();

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

  const firstPrice =
    event?.groupedTicket[0]?.groupedTicketType === "paid"
      ? event?.groupedTicket[0]?.ticketPrice
      : 0;

  // Find the last ticket with a groupedTicketType of "paid"
  const lastTicket = event?.groupedTicket
    ?.slice()
    .reverse()
    .find(
      (ticket) =>
        ticket.groupedTicketType === "paid" ||
        ticket.groupedTicketType === "free"
    );
  const lastPrice = lastTicket ? lastTicket.ticketPrice : 0;

  // Compare and return the price range
  const priceRange = () => {
    if (firstPrice < lastPrice) {
      return toFiat(firstPrice) + " - " + toFiat(lastPrice);
    } else {
      return toFiat(lastPrice) + " - " + toFiat(firstPrice);
    }
  };

  const handleGroupTicket = () => {
    if (tickets.length > 0) {
      console.log(tickets);
      router.push(`/explore-events/${id}/checkout`);
    }
  };

  return (
    <Fragment>
      <div className="bg-pitchNoise py-5 px-4 fixed z-20 shadow-2xl shadow-white border-black border-t-2 bottom-0 w-full lg:hidden flex justify-between items-center">
        <p className="font-pally-medium text-lg">
          {event?.ticketCategory === "entry"
            ? event?.entryTicket?.entryTicketType === "paid"
              ? toFiat(event?.entryTicket?.ticketPrice)
              : toFiat(0)
            : priceRange()}
        </p>

        <Button onClick={() => setIsOpen(!isOpen)} variant="destructive">
          View Tickets
        </Button>

        <Dialog
          open={isOpen}
          as="div"
          className="relative z-40 focus:outline-none"
          onClose={() => setIsOpen(!isOpen)}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="flex flex-col min-h-full items-center justify-end">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 transition delay-150 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:transform-[transformY(-45)]"
              >
                <div className="mx-auto w-full max-w-sm">
                  <div className="flex justify-between items-start p-0">
                    <div className="space-y-1.5">
                      <h6 className="text-start font-pally-medium text-[#515A6A] text-base md:text-lg">
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

                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className="p-1.5 rounded-full bg-gray-200 absolute top-3 right-3"
                    >
                      <RiCloseLine size={20} />
                    </div>
                  </div>
                  <div className="my-5">
                    {event?.ticketCategory === "grouped" && (
                      <>
                        <div className="space-y-4">
                          {event?.groupedTicket.map((ticket) => (
                            <GroupedTicket
                              key={ticket._id}
                              id={id}
                              groupedTicket={ticket}
                            />
                          ))}
                        </div>
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

                    {checkIfEndDateReached &&
                      event?.ticketCategory === "entry" && (
                        <EntryTicketComponent
                          entryTicket={event?.entryTicket}
                          id={id}
                        />
                      )}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>

        {/* <Drawer>
          <DrawerTrigger asChild>
            <Button variant="destructive">View Tickets</Button>
          </DrawerTrigger>
          <DrawerContent className="bg-white px-4">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="flex justify-between items-start p-0">
                <DrawerTitle>
                  <div className="space-y-1.5">
                    <h6 className="text-start font-pally-medium text-[#515A6A] text-base md:text-lg">
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
                </DrawerTitle>
                <DrawerClose asChild>
                  <div className="p-1.5 rounded-full bg-gray-200 absolute top-3 right-3">
                    <RiCloseLine size={20} />
                  </div>
                </DrawerClose>
              </DrawerHeader>
              <div className="my-5">
                {event?.ticketCategory === "grouped" && (
                  <>
                    <div className="space-y-4">
                      {event?.groupedTicket.map((ticket) => (
                        <GroupedTicket
                          key={ticket._id}
                          id={id}
                          groupedTicket={ticket}
                        />
                      ))}
                    </div>
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

                {checkIfEndDateReached && event?.ticketCategory === "entry" && (
                  <EntryTicketComponent
                    entryTicket={event?.entryTicket}
                    id={id}
                  />
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer> */}
      </div>
    </Fragment>
  );
};

export default TicketCTA;
