import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { RiCloseLine } from "react-icons/ri";
import { availableTickets } from "@/static-datas/ticketsData";
import Ticket from "./ticket";
import Link from "next/link";

const TicketCTA: React.FC<{ price: string; id: string }> = ({ price, id }) => {
  return (
    <div className="bg-pitchNoise py-5 px-4 fixed z-20 bottom-0 w-full flex justify-between items-center">
      <p>{price}</p>

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="destructive">View Tickets</Button>
        </DrawerTrigger>
        <DrawerContent className="bg-white">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="flex justify-between items-start p-0">
              <DrawerTitle>
                <div className="space-y-1.5">
                  <h6 className="text-start font-pally-medium text-[#515A6A] text-base md:text-lg">
                    AVAILABLE TICKETS
                  </h6>
                  <p className="rounded-3xl text-sm text-[#523300] font-pally-regular px-2 py-1 bg-[#F7D394]">
                    Ticket sales ending in 3 days
                  </p>
                </div>
              </DrawerTitle>
              <DrawerClose asChild>
                <div className="p-1.5 rounded-full bg-gray-200 absolute top-3 right-3">
                  <RiCloseLine size={20} />
                </div>
              </DrawerClose>
            </DrawerHeader>
            <div className="my-5">
              <div className="space-y-4">
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
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default TicketCTA;
