"use client";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import { HiOutlineMinus } from "react-icons/hi2";
import { HiPlus } from "react-icons/hi";
import { toFiat } from "@/lib/amount";
import ToolTipComponent from "@/components/ToolTipComponent";
import TicketPlacement from "./TicketPlacement";

interface Props {
  maxCount: number;
  ticketName: string;
  price: number;
  image: string;
}

const GroupedTicket: React.FC<Props> = ({ price, ticketName, maxCount, image }) => {
  const [counter, setCounter] = useState<number>(0);

  //   Get max count
  const maximumCount = maxCount;

  // Increment
  const handleIncrement = useCallback(() => {
    setCounter((prev: number) => {
      if (prev === maximumCount) {
        return maximumCount;
      }
      return prev + 1;
    });
  }, [maximumCount]);

  //   Decrement
  const handleDecrement = useCallback(() => {
    setCounter((prev: number) => {
      if (prev === 0) {
        return 0;
      }
      return prev - 1;
    });
  }, []);
  return (
    <div className="border border-[#CFD9E8] rounded-lg flex justify-between items-start">
      <div className="flex gap-3">
        <div className="w-16 h-24">
          <Image
            src={image}
            width={456}
            height={280}
            alt={`ticket name`}
            className="pointer-events-none w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
          />
        </div>
        <div className="py-2 flex flex-col justify-between text-[#2C2B2E] font-pally-medium">
          <p>{ticketName}</p>
          <p>{toFiat(price)}</p>
        </div>
      </div>
      <div className="p-2 space-y-4 flex flex-col justify-between items-end">
        <ul className="flex items-center gap-3">
          <li
            onClick={handleDecrement}
            className="border border-[#555A6E] text-[#555A6E] p-1 rounded-full cursor-pointer"
          >
            <HiOutlineMinus size={20} />
          </li>
          <li className="font-pally-medium text-lg">{counter}</li>
          <li
            onClick={handleIncrement}
            className="bg-destructive text-white p-1 rounded-full cursor-pointer"
          >
            <HiPlus size={20} />
          </li>
        </ul>
        <ToolTipComponent
          button={
            <p className="font-pally-regular text-sm destructive">Learn more</p>
          }
          content={<TicketPlacement />}
        />
      </div>
    </div>
  );
};

export default GroupedTicket;
