import { toFiat } from "@/lib/amount";
import { GroupPaidType } from "@/lib/types/EventType";
import React, { FC } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import TicketSaleToggle from "../TicketSaleToggle";

interface SeatCardProps extends GroupPaidType {
  _id: number;
  handleEditForm: (id: number) => void;
  handleDelete: (id: number) => void;
  isPublished?: boolean;
  ticketSaleActive?: boolean;
}

const SeatCard: FC<SeatCardProps> = ({
  _id,
  ticketName,
  ticketCategory,
  ticketPrice,
  ticketQuantity,
  color,
  handleEditForm,
  handleDelete,
  isPublished,
  ticketSaleActive,
}) => {
  const onSale = ticketSaleActive !== false;
  return (
    <div className="bg-[#fae4e2] rounded-lg p-3 lg:p-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          {color && (
            <div
              style={{ backgroundColor: color }}
              className="w-6 h-6 rounded-md"
            />
          )}
          <p className="font-pally-medium text-black md:text-lg">
            {ticketName}
          </p>
        </div>
        {ticketPrice ? (
          <p className="font-pally-medium text-black md:text-lg">
            {toFiat(ticketPrice)}
          </p>
        ) : (
          <p className="font-pally-medium text-black md:text-lg">Free ticket</p>
        )}
      </div>
      <div className="mt-5 flex justify-between items-center">
        <div className="flex gap-4">
          <p className="py-0.5 px-1 lg:p-1.5 flex justify-center items-center rounded-xl lg:rounded-3xl border text-xs border-black text-black">
            {ticketCategory}
          </p>
          <p className="py-0.5 px-1 lg:p-1.5 flex justify-center items-center rounded-xl lg:rounded-3xl border text-xs border-black text-black">
            {ticketQuantity} Quantity
          </p>
        </div>
        <div className="flex justify-end items-center gap-4">
          {isPublished ? (
            // Published: the ticket type is fixed; only its sales can be
            // stopped or resumed.
            <>
              <p className="text-xs text-black font-pally-regular">
                {onSale ? "On sale" : "Sales stopped"}
              </p>
              <TicketSaleToggle
                ticketId={String(_id)}
                onSale={onSale}
                className="text-black"
              />
            </>
          ) : (
            <>
              <div onClick={() => handleEditForm(_id)} className="cursor-pointer">
                <p className="font-pally-regular text-sm underline destructive">
                  Edit
                </p>
              </div>
              <div
                onClick={() => handleDelete(_id)}
                className="cursor-pointer bg-black/70 rounded p-1"
              >
                <HiOutlineTrash
                  size={16}
                  className="text-white hover:text-red-500"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatCard;
