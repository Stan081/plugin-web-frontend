"use client"
import React, { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HiOutlineTrash } from "react-icons/hi2";
import Image from "next/image";
import { AgendaListsType } from "@/static-datas/create-event";
import { calculateDuration } from "@/lib/utils";
import { AgendaType } from "@/lib/types/EventType";

interface AgendListsProps extends AgendaType {
  handleEditForm: (id: number) => void;
  handleDelete: (id: number) => void;
  _id: number;
}

const bgColor = [
  {
    border: "#40B869",
    bgColor: "#F2FAF5",
  },
  {
    border: "#F58B86",
    bgColor: "#FFEEED",
  },
  {
    border: "#F5B546",
    bgColor: "#FEF6E7",
  },
];

const AgendLists: FC<AgendListsProps> = ({
  _id,
  description,
  title,
  host,
  startTime,
  endTime,
  handleEditForm,
  handleDelete,
}) => {
  const getRandomColor = () => {
    let getRan = Math.floor(Math.random() * bgColor.length);
    return bgColor[getRan];
  };

  const selectedColor = getRandomColor();

  // get duration
  const duration = calculateDuration(startTime, endTime);

  return (
    <AccordionItem
      value={`item-${_id}`}
      style={{
        borderColor: selectedColor.border,
        backgroundColor: selectedColor.bgColor,
      }}
      className="border-t-4 rounded-xl px-4"
    >
      <AccordionTrigger>
        <div className="w-full flex flex-col justify-start items-start">
          <p className="text-[#667185] text-sm font-pally-regular">
            Duration : {duration}
          </p>
          <p className="text-[#101928] font-pally-medium text-xl">{title}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <p className="font-pally-regular text-[#667185] md:text-lg">
          {description}
        </p>
        <div className="mt-5 flex justify-between items-center">
          {host?.photo ? (
            <div className="flex items-center gap-4">
              <Image
                src={host.photo}
                width={40}
                height={40}
                alt={host.name || "Host"}
                className="w-10 h-10 pointer-events-none object-cover rounded-full"
              />
              <div>
                <p className="font-pally-regular text-sm text-[#667185]">
                  Host
                </p>
                <p className="font-pally-medium text-[#667185]">{host.name}</p>
              </div>
            </div>
          ) : (
            <div />
          )}
          <div className="flex justify-end gap-4">
            <div onClick={() => handleEditForm(_id)} className="cursor-pointer">
              <p className="font-pally-regular text-sm underline destructive">
                Edit Pass
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
      </AccordionContent>
    </AccordionItem>
  );
};

export default AgendLists;
