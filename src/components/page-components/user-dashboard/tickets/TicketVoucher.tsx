import TicketIcon from "@/components/icons/ticket";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import Image from "next/image";
import React from "react";
import { formatDate } from "@/components/TicketComponent";

type TicketDataProps = {
  price?: number;
  name?: string;
};

export type TicketProps = {
  _id: string;
  eventId: string;
  ticketData: TicketDataProps;
  createdAt: string;
  qrCode: string;
};
interface Props {
  data?: TicketProps;
}
const TicketVoucher = ({ data }: Props) => {
  return (
    <div className="border p-3 rounded-lg space-y-4 mt-3">
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-1 mt-3">
          <TicketIcon />{" "}
          <p className="text-sm whitespace-nowrap text-black font-pally-medium">
            TKT-{data?._id}
          </p>
        </div>
        <p className="text-sm font-pally-medium text-[#98A2B3]">
          {formatDate(data?.createdAt)}
        </p>
      </div>
      <Separator />
      <div className="flex justify-between items-center gap-10 mt-8">
        <div className="p-0.5 rounded-lg bg-[#F5F7F9]">
          <Image
            src={data?.qrCode}
            width={156}
            height={173}
            alt="barcode"
            className="w-auto h-auto pointer-events-none rounded-lg"
          />
        </div>
        <div>
          <div className=" flex justify-between gap-6">
            <p className="text-sm md:text-base text-[#515A6A] font-pally-regular">
              Ticket Type:
            </p>
            <p className="text-sm md:text-base text-[#515A6A] font-pally-medium">
              {data?.ticketData?.name}
            </p>
          </div>
          <div className="mt-4 flex justify-between gap-6">
            <p className="text-sm md:text-base text-[#515A6A] font-pally-regular">
              Price/ ticket:
            </p>
            <p className="text-sm md:text-base text-[#515A6A] font-pally-medium">
              {toFiat(data?.ticketData?.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketVoucher;
