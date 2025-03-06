"use client";
import React, { Fragment } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BsQuestionCircle } from "react-icons/bs";
import Link from "next/link";

const EventSupportCenter = () => {
  const questAnswer = [
    {
      title: "How to Reassign Tickets",
      desciption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nulla, aut sapiente voluptas itaque dolorum id enim distinctio unde! Aliquid ex praesentium soluta commodi consequatur excepturi nesciunt esse odio pariatur.",
    },
    {
      title: "How to Reassign Tickets",
      desciption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nulla, aut sapiente voluptas itaque dolorum id enim distinctio unde! Aliquid ex praesentium soluta commodi consequatur excepturi nesciunt esse odio pariatur.",
    },
    {
      title: "How to Reassign Tickets",
      desciption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nulla, aut sapiente voluptas itaque dolorum id enim distinctio unde! Aliquid ex praesentium soluta commodi consequatur excepturi nesciunt esse odio pariatur.",
    },
    {
      title: "How to Reassign Tickets",
      desciption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nulla, aut sapiente voluptas itaque dolorum id enim distinctio unde! Aliquid ex praesentium soluta commodi consequatur excepturi nesciunt esse odio pariatur.",
    },
    {
      title: "How to Reassign Tickets",
      desciption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nulla, aut sapiente voluptas itaque dolorum id enim distinctio unde! Aliquid ex praesentium soluta commodi consequatur excepturi nesciunt esse odio pariatur.",
    },
    {
      title: "How to Reassign Tickets",
      desciption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nulla, aut sapiente voluptas itaque dolorum id enim distinctio unde! Aliquid ex praesentium soluta commodi consequatur excepturi nesciunt esse odio pariatur.",
    },
  ];
  return (
    <Fragment>
      <h1 className="font-pally-medium text-lg lg:text-2xl mb-5">
        Support Center
      </h1>
      <div className="flex flex-col lg:flex-row items-start gap-10">
        <Accordion type="single" collapsible className="w-full">
          {questAnswer?.map((item, index) => (
            <AccordionItem
              value={`item-${index + 1}`}
              className="w-full border px-3 rounded-2xl my-3"
            >
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-gray-200 p-2">
                    <BsQuestionCircle size={14} />
                  </div>
                  <p className="text-base lg:text-lg font-pally-medium">
                    {item.title}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>{item.desciption}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="w-full max-w-72 rounded-lg border ">
          <div className="px-20 py-6 bg-[#EDEDED]">
            <Image
              src={
                "https://res.cloudinary.com/dbhbyikta/image/upload/v1741196264/man-working_xl1xqg.svg"
              }
              width={278}
              height={150}
              alt="working man"
              className="rounded-tr-lg rounded-tl-lg object-cover pointer-events-none"
            />
          </div>

          <div className="p-4 space-y-2.5">
            <p className="font-pally-medium text-xl mt-4">
              Need Help? Reach out to support agent
            </p>

            <p className="font-pally-regular text-[#475367] text-sm mt-4">
              Submit a support request to get assistance from our admin agents
            </p>

            <Link href={'mailto:support@pluginent.com'}>
              <Button variant="destructive" size="sm" className="w-full">
                Talk to an agent
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EventSupportCenter;
