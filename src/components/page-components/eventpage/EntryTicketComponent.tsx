import ToolTipComponent from "@/components/ToolTipComponent";
import { toFiat } from "@/lib/amount";
import React, { FC, Fragment, useCallback, useState } from "react";
import TicketPlacement from "./TicketPlacement";
import { HiOutlineMinus, HiPlus } from "react-icons/hi2";
import { useEventsContext } from "@/providers/events.provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type Props = {
  ticketQuantity: number;
  ticketName: string;
  ticketPrice?: number;
  entryTicketType: string;
  ticketPeaks: string;
  ticketsSold: number;
};

interface EntryProps {
  entryTicket: Props;
  id: string;
}

const setCookie = (key: string, value: any) => {
  try {
    Cookies.set(key, JSON.stringify(value)); // Serialize the object
  } catch (error) {
    console.error("Error setting value:", error);
  }
};

const EntryTicketComponent: FC<EntryProps> = ({ entryTicket, id }) => {
  const { counter, setCounter } = useEventsContext();

  const router = useRouter();

  const getRemainingTicket =
    entryTicket?.ticketQuantity - entryTicket?.ticketsSold;

  //   Get max count
  const maximumCount = entryTicket?.ticketQuantity;

  // Increment
  const handleIncrement = useCallback(() => {
    setCounter((prev: number) => {
      if (prev === getRemainingTicket) {
        return getRemainingTicket;
      }
      return prev + 1;
    });
  }, [getRemainingTicket]);

  //   Decrement
  const handleDecrement = useCallback(() => {
    setCounter((prev: number) => {
      if (prev === 0) {
        return 0;
      }
      return prev - 1;
    });
  }, []);

  const handleEntryTicket = () => {
    if (counter > 0) {
      const data = {
        name: entryTicket?.ticketName,
        price:
          entryTicket?.ticketPrice === undefined ? 0 : entryTicket?.ticketPrice,
        quantity: counter,
      };
      setCookie("entryTicket", data);
      router.push(`/explore-events/${id}/checkout`);
    }
  };

  return (
    <Fragment>
      <div className="border border-[#CFD9E8] rounded-lg flex justify-between items-start">
        <div className="p-2 flex flex-col gap-4 justify-between">
          <p className="text-[#646267] font-pally-medium">
            {entryTicket?.ticketName
              ? entryTicket?.ticketName.slice(0, 1).toLocaleUpperCase() +
                entryTicket?.ticketName.slice(1)
              : entryTicket?.ticketName}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-[#2C2B2E] font-pally-bold text-2xl">
              {entryTicket?.entryTicketType === "paid"
                ? toFiat(entryTicket?.ticketPrice)
                : toFiat(0)}
            </p>
            {entryTicket?.ticketQuantity === entryTicket?.ticketsSold ||
              (entryTicket?.ticketsSold >= entryTicket?.ticketQuantity && (
                <p className="bg-red-500 text-white py-0.5 px-1 rounded-3xl text-xs">
                  Sold out
                </p>
              ))}
          </div>
        </div>

        <div className="p-2 space-y-4 flex flex-col justify-between items-end">
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecrement}
              className={`border border-[#555A6E] ${
                counter === 0
                  ? "bg-gray-200 border-gray-200 cursor-not-allowed"
                  : "cursor-pointer"
              } text-[#555A6E] p-1 rounded-full`}
              disabled={counter === 0}
            >
              <HiOutlineMinus size={18} />
            </button>
            <p className="font-pally-medium text-lg">{counter}</p>
            <button
              onClick={handleIncrement}
              type="button"
              disabled={
                maximumCount === counter ||
                entryTicket?.ticketQuantity === entryTicket?.ticketsSold ||
                counter >= getRemainingTicket
              }
              className={`${
                maximumCount === counter ||
                entryTicket?.ticketQuantity === entryTicket?.ticketsSold ||
                counter >= getRemainingTicket
                  ? `bg-gray-300 cursor-not-allowed`
                  : `bg-destructive`
              } text-white rounded-full p-1`}
            >
              <HiPlus size={18} />
            </button>
          </div>
          <ToolTipComponent
            button={
              <p className="font-pally-regular text-sm destructive">
                Learn more
              </p>
            }
            content={<TicketPlacement text={entryTicket?.ticketPeaks} />}
          />
        </div>
      </div>
      <Button
        onClick={handleEntryTicket}
        variant="destructive"
        size="lg"
        disabled={counter === 0}
        className="mt-5 w-full py-3"
      >
        Checkout
      </Button>
    </Fragment>
  );
};

export default EntryTicketComponent;
