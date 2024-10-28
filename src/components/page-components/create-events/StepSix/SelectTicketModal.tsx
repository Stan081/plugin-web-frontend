import React, { FC, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCreateEventContext } from "@/providers/create_event.provider";

interface SelectTicketModalProps {
  isOpen: boolean;
  close: () => void;
}

const tickets = [
  {
    id: 1,
    slug: "entry",
    ticketTitle: "Entry Ticket",
    ticketDescription:
      "Create general admission tickets that allow entry without assigning a specific seat or section.",
    ticketThumbnail:
      "https://ik.imagekit.io/pluginImage/Plugin-images/Frame%201618869795.png?updatedAt=1726696684519",
  },
  {
    id: 2,
    slug: "grouped",
    ticketTitle: "Grouped Tickets ",
    ticketDescription:
      "Create multiple ticket categories at once by associating tickets with specific seats or sections on the seat map.",
    ticketThumbnail:
      "https://ik.imagekit.io/pluginImage/Plugin-images/Frame%201618869792.png?updatedAt=1726696708583",
  },
];

const SelectTicketModal: FC<SelectTicketModalProps> = ({ isOpen, close }) => {
  const { setSelectedTicket } = useCreateEventContext();
  // get selected ticket
  const handleClicked = (id: number) => {
    const getSelected = tickets.find((tick) => tick.id === id);
    setSelectedTicket(getSelected.slug);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-3xl rounded-2xl bg-[#281E17] p-4 md:p-8 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium flex justify-between items-start"
            >
              <p className="font-pally-medium text-white text-center w-full text-2xl">
                Select a ticket category
              </p>
              <div
                onClick={() => close()}
                className="p-1.5 rounded-full bg-gray-600 cursor-pointer"
              >
                <RiCloseLine size={20} color="#fff" />
              </div>
            </DialogTitle>
            <ul className="w-full mt-8 flex flex-col lg:flex-row gap-5 md:gap-8 ">
              {tickets.map((ticket) => (
                <li
                  key={ticket.id}
                  className="rounded-xl bg-[#FDE5E3] flex flex-col md:justify-between w-full md:w-1/2 gap-6 md:gap-10 px-3 md:px-5 pt-3 md:pt-5"
                >
                  <div className="space-y-2">
                    <p className="text-black text-lg md:text-xl font-pally-bold ">
                      {ticket.ticketTitle}
                    </p>
                    <p className="text-sm md:text-base text-[#333333] font-pally-regular">
                      {ticket.ticketDescription}
                    </p>
                    <Button
                      variant="destructive"
                      className="mt-5"
                      onClick={() => {
                        handleClicked(ticket.id);
                        close();
                      }}
                    >
                      Create {ticket.ticketTitle}
                    </Button>
                  </div>

                  {ticket.ticketThumbnail && (
                    <div className="h-32 w-full">
                      <Image
                        src={ticket.ticketThumbnail}
                        width={336}
                        height={219}
                        alt={ticket.ticketTitle}
                        className="w-full h-full pointer-events-none object-cover rounded-tl-xl rounded-tr-xl"
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SelectTicketModal;
