import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import React, { useState } from "react";
import ReceiptModal from "../ReceiptModal";
// import { formatDate } from "@/components/TicketComponent";
import { TicketType, UserType } from "./TicketSummary";

interface Props {
  data?: TicketType[];
  user: UserType;
}
const OrderSummary = ({ data, user }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const totalPrice = data?.reduce(
    (sum, ticket) => sum + ticket?.ticketData?.price,
    0
  );

  return (
    <div className="mt-4 bg-[#F9F7F7] p-3 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {" "}
          <p className="font-pally-regular text-[#515A6A] text-sm md:text-base">
            {data?.length} tickets
          </p>
          <div className="w-1 h-1 bg-gray-500 rounded-full" />
          <p className=" font-pally-medium text-base md:text-lg ">
            {toFiat(totalPrice)}
          </p>
        </div>

        <Button onClick={() => setIsOpen(!isOpen)} variant="outline" size="sm">
          View receipt
        </Button>
      </div>
      <ReceiptModal
        total={totalPrice}
        data={data}
        open={isOpen}
        email={user?.email}
        close={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default OrderSummary;
