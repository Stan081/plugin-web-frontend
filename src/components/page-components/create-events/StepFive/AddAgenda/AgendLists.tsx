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

const bgColor = [
  {
    border: "#40B869",
    bgColor: "#463635",
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

const AgendLists: FC<AgendaListsType> = ({
  hostImage,
  isHost,
  agendaDescription,
  agendaTitle,
  hostName,
}) => {
  return (
    <AccordionItem
      value="item-1"
      className="border-t-4 border-[#40B869] bg-[#F2FAF5] rounded-xl px-4"
    >
      <AccordionTrigger>
        <div>
          <p className="text-[#667185] text-sm font-pally-regular">
            Duration : 20 minutes
          </p>
          <p className="text-[#101928] font-pally-medium text-xl">
            Opening speech{" "}
          </p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <p className="font-pally-regular text-[#667185] md:text-lg">
          Join us for Sip 'n' Paint with Wakkytails at Uyai at Dusk! Enjoy a
          creative evening of painting and sipping exquisite cocktails. Perfect
          for all skill levels, come relax and unleash your inner artist!
        </p>
        <div className="mt-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src={"/images/blue-bg.png"}
              width={40}
              height={40}
              alt="hihi"
              className="w-10 h-10 pointer-events-none object-cover rounded-full"
            />
            <div>
              <p className="font-pally-regular text-sm text-[#667185]">Host</p>
              <p className="font-pally-medium text-[#667185]">Marc Beto</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div
              // onClick={() => handleEditForm(id)}
              className="cursor-pointer"
            >
              <p className="font-pally-regular text-sm underline destructive">
                Edit Pass
              </p>
            </div>
            <div
              // onClick={() => handleDelete(id)}
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
