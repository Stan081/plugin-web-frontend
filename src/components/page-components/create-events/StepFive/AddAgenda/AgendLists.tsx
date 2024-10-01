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

interface AgendListsProps extends AgendaListsType {
  handleEditForm: (id: number) => void;
  handleDelete: (id: number) => void;
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
  id,
  hostImage,
  isHost,
  agendaDescription,
  agendaTitle,
  hostName,
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
      value={`item-${id}`}
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
          <p className="text-[#101928] font-pally-medium text-xl">
            {agendaTitle}
          </p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <p className="font-pally-regular text-[#667185] md:text-lg">
          {agendaDescription}
        </p>
        <div className="mt-5 flex justify-between items-center">
          {isHost ? (
            <div className="flex items-center gap-4">
              {hostImage && (
                <Image
                  src={hostImage}
                  width={40}
                  height={40}
                  alt={hostName}
                  className="w-10 h-10 pointer-events-none object-cover rounded-full"
                />
              )}
              <div>
                <p className="font-pally-regular text-sm text-[#667185]">
                  Host
                </p>
                <p className="font-pally-medium text-[#667185]">{hostName}</p>
              </div>
            </div>
          ) : (
            <div />
          )}
          <div className="flex justify-end gap-4">
            <div
              onClick={() => handleEditForm(id)}
              className="cursor-pointer"
            >
              <p className="font-pally-regular text-sm underline destructive">
                Edit Pass
              </p>
            </div>
            <div
              onClick={() => handleDelete(id)}
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
