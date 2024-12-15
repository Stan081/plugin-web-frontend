import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import { IoTicket } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { TbReceipt } from "react-icons/tb";
import { BsDownload, BsTicketPerforated } from "react-icons/bs";
import { toFiat } from "@/lib/amount";
type TicketDataProps = {
  price?: number;
  name?: string;
};

export type TicketProps = {
  _id: string;
  eventId: string;
  ticketData: TicketDataProps;
  createdAt: string;
};
interface ReceiptModalProps {
  open: boolean;
  close: () => void;
  createdAt: string;
  data?: TicketProps[];
  total?: number;
  email?: string;
}

type TicketAccumulator = {
  [ticketName: string]: {
    count: number;
    price: number;
  };
};

const ReceiptModal: React.FC<ReceiptModalProps> = ({
  open,
  close,
  createdAt,
  data,
  total,
  email,
}) => {
  // Count occurrences of each ticket name and store price in a typed accumulator
  const ticketCount = data?.reduce<TicketAccumulator>((acc, ticket) => {
    const ticketName = ticket.ticketData.name;
    const ticketPrice = ticket.ticketData.price;

    if (!acc[ticketName]) {
      acc[ticketName] = { count: 0, price: ticketPrice };
    }

    acc[ticketName].count += 1;
    return acc;
  }, {});

  // Format the result in JSX
  // const formattedTickets = Object?.entries(ticketCount).map(
  //   ([name, { count, price }]) => (
  //     <div className="flex justify-between" key={name}>
  //       <p className="text-sm md:text-base text-[#515A6A] font-pally-regular">
  //         {count} x {name}
  //       </p>
  //       <p className="text-sm md:text-base text-[#515A6A] font-pally-medium">
  //         {toFiat(price)}
  //       </p>
  //     </div>
  //   )
  // );

  return (
    <div>
      <Dialog
        open={open}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium flex justify-between items-start"
              >
                <p className="px-3 py-1.5 bg-[#DAF0E1] flex items-center gap-2 p rounded-3xl text-[#04802E]">
                  Ticket Confirmed
                  <span className="inline-block">
                    <IoCheckmarkCircleSharp size={18} color="#04802E" />
                  </span>
                </p>
                <div onClick={close} className="p-1.5 rounded-full bg-gray-200">
                  <RiCloseLine size={20} />
                </div>
              </DialogTitle>
              <div>
                <div className="my-6 flex gap-5">
                  <IoTicket size={60} className="destructive" />
                  <div className="space-y-2">
                    <p className="font-pally-regular text-[#515A6A]">
                      Your ticket has been sent to{" "}
                    </p>
                    <p className="font-pally-medium text-xl">{email}</p>
                  </div>
                </div>
                <Separator />
                <div className="my-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <p className="flex items-center gap-2">
                      <TbReceipt size={18} color="#667185" />
                      <span className="font-pally-medium">Order summary</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <BsDownload size={18} className="destructive" />
                      <span className="font-pally-medium destructive underline">
                        Download Ticket
                      </span>
                    </p>
                  </div>
                  <div className=" flex justify-between">
                    <p className="text-sm md:text-base text-[#515A6A] font-pally-regular">
                      Order ID
                    </p>
                    <p className="text-sm md:text-base text-[#515A6A] font-pally-medium">
                      #1242801
                    </p>
                  </div>
                  <div className=" flex justify-between">
                    <p className="text-sm md:text-base text-[#515A6A] font-pally-regular">
                      Date issued
                    </p>
                    <p className="text-sm md:text-base text-[#515A6A] font-pally-medium">
                      {createdAt}
                    </p>
                  </div>
                  <div className=" flex justify-between">
                    <p className="text-sm md:text-base text-[#515A6A] font-pally-regular">
                      Quantity
                    </p>
                    <p className="text-sm md:text-base text-[#515A6A] font-pally-medium">
                      {data?.length} tickets
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="my-6 flex flex-col gap-4">
                  <p className="flex items-center gap-2">
                    <BsTicketPerforated size={18} color="#667185" />
                    <span className="font-pally-medium">Tickets</span>
                  </p>
                  {ticketCount &&
                    Object.entries(ticketCount).map(
                      ([name, { count, price }], index) => (
                        <div className="flex justify-between" key={index}>
                          <p className="text-sm md:text-base text-[#515A6A] font-pally-regular">
                            {count} x {name}
                          </p>
                          <p className="text-sm md:text-base text-[#515A6A] font-pally-medium">
                            {toFiat(price * count)}
                          </p>
                        </div>
                      )
                    )}

                  <div className=" flex justify-between">
                    <p className="text-sm md:text-base font-pally-medium">
                      Total
                    </p>
                    <p className="text-sm md:text-base font-pally-medium">
                      {toFiat(total)}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm font-pally-regular text-center text-[#ee4d35]">
                  Report an issue with this ticket
                </p>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ReceiptModal;
