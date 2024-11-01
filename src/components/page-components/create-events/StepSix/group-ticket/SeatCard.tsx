import { toFiat } from "@/lib/amount";
import { GroupPaidType } from "@/lib/types/EventType";
import React, { FC } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

interface SeatCardProps extends GroupPaidType {
  _id: number;
  handleEditForm: (id: number) => void;
  handleDelete: (id: number) => void;
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
}) => {
  return (
    <div className="bg-[#fae4e2] rounded-lg p-5">
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
        <ul className="flex gap-4">
          <li className="p-1.5 rounded-3xl border border-black text-black">
            {ticketCategory}
          </li>
          <li className="p-1.5 rounded-3xl border border-black text-black">
            {ticketQuantity} Quantity
          </li>
          {/* <li className="p-1.5 rounded-md border border-black text-black">
            {selectedTicketseatType} ticket
          </li> */}
        </ul>
        <div className="flex justify-end gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default SeatCard;
