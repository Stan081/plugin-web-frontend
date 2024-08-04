"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Seaction";
import UpcomingEvent from "./upcomingEvent";
import { cardData } from "@/static-datas/cards-data";
import CardComponent from "@/components/CardComponent";

const TailoredEvent: React.FC = () => {
  // Temp mock data
  const items = [
    {
      id: 1,
      label: "Concerts",
      color: "bg-[rgba(255,84,3,0.05)] border-orange-500",
      position: "top-0 right-20",
      mobilePosition: "top-0 right-4",
      rotate: [-8, 36, -8],
    },
    {
      id: 2,
      label: "Religion",
      color: "bg-[#F6DDE5] border-[#FA7070]",
      position: "top-28 left-10",
      mobilePosition: "top-10 left-20",
      rotate: [-13, 10, -13],
    },
    {
      id: 3,
      label: "Business",
      color: "bg-[#E4E7EC] border-[#515A6A]",
      position: "top-32 left-56",
      mobilePosition: "top-32 right-10",
      rotate: [40, -20, 40],
    },
    {
      id: 4,
      label: "Campaign",
      color: "bg-[#E4EBFF] border-[#4D77FF]",
      position: "top-64 left-32",
      mobilePosition: "top-64 right-3",
      rotate: [9, -30, 9],
    },
    {
      id: 5,
      label: "Others",
      color: "bg-[rgba(255,84,3,0.05)] border-orange-500",
      position: "top-0 left-20",
      mobilePosition: "top-0 left-6",
      rotate: [16, -8, 16],
    },
    {
      id: 6,
      label: "Parties",
      color: "bg-[#E4EBFF] border-[#4D77FF]",
      position: "top-28 right-80",
      mobilePosition: "bottom-0 right-20",
      rotate: [44, -20, 44],
    },
    {
      id: 7,
      label: "Hangout",
      color: "bg-[#F6DDE5] border-[#FA7070]",
      position: "top-32 left-40",
      mobilePosition: "top-32 left-6",
      rotate: [-16, 33, -16],
    },
    {
      id: 8,
      label: "Corporate",
      color: "bg-[#E4E7EC] border-[#515A6A]",
      position: "top-64 left-20",
      mobilePosition: "top-64 left-4",
      rotate: [9, -30, 9],
    },
  ];

  const variants = (num: number[]) => ({
    animate: {
      rotate: num, // degrees
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  });

  const EventMobile = () => {
    return (
      <Container className="lg:hidden inline-block overflow-hidden">
        <div className="mx-auto w-full md:w-2/3 flex flex-col gap-4">
          <h2 className="font-pally-medium text-3xl text-center">
            Events tailored to <br /> your{" "}
            <span className="text-[#765fbe]">preferences</span>
          </h2>
          <p className="font-pally-regular text-base md:text-lg text-center mx-auto">
            Our user-friendly software selects event listings based on your
            location or top priorities, making your search much more fun.
          </p>
          <div className="mx-auto">
            <Button variant="outline">Explore events</Button>
          </div>
        </div>
        <div className="flex py-8 justify-center gap-20 h-[500px]">
          <ul className="w-[100px] space-y-6 p-0 list-none relative ">
            {items.slice(0, 4).map((item) => (
              <motion.li
                key={item.id}
                className={`absolute ${item.mobilePosition} ${item.color} border-2 rounded-full py-2.5 px-5 font-pally-regular`}
                variants={variants(item.rotate)}
                animate="animate"
              >
                {item.label}
              </motion.li>
            ))}
          </ul>
          <ul className="w-[100px] space-y-6 p-0 list-none relative">
            {items.slice(4, 8).map((item) => (
              <motion.li
                key={item.id}
                className={`absolute ${item.mobilePosition} ${item.color} border-2 rounded-full py-2.5 px-5 font-pally-regular mx-auto`}
                variants={variants(item.rotate)}
                animate="animate"
              >
                {item.label}
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    );
  };

  return (
    <Section id="Our tailored events" className="isolate">
      <div className="bg-whiteNoise bg-cover backdrop-blur-md md:py-20">
        {/* For desktop view */}
        <Container className="hidden lg:block">
          <div className="flex justify-between gap-10 w-full mx-auto">
            <ul className="w-[25%] p-0 list-none relative ">
              {items.slice(0, 4).map((item) => (
                <motion.li
                  key={item.id as number}
                  className={`absolute ${item.position} ${item.color} border-2 rounded-full py-2.5 px-5 font-pally-regular`}
                  variants={variants(item.rotate)}
                  animate="animate"
                >
                  {item.label}
                </motion.li>
              ))}
            </ul>

            <div className="mx-auto w-full md:w-[25%] flex flex-col gap-4">
              <h2 className="font-pally-medium text-[36px] text-center">
                Events tailored to <br /> your{" "}
                <span className="text-[#765fbe]">preferences</span>
              </h2>
              <p className="font-pally-regular text-base md:text-lg text-center mx-auto">
                Our user-friendly software selects event listings based on your
                location or top priorities, making your search much more fun.
              </p>
              <div className="mx-auto">
                <Button variant="outline">Explore events</Button>
              </div>
            </div>

            <ul className="w-[25%] p-0 list-none relative ">
              {items.slice(4, 8).map((item) => (
                <motion.li
                  key={item.id as number}
                  className={`absolute ${item.position} ${item.color} border-2 rounded-full py-2.5 px-5 font-pally-regular`}
                  variants={variants(item.rotate)}
                  animate="animate"
                >
                  {item.label}
                </motion.li>
              ))}
            </ul>
          </div>
        </Container>

        {/* Tailored event for mobile view */}
        <EventMobile />

        {/* Upcoming events component */}
        {/* <UpcomingEvent/> */}
        <Container className="mt-20 overflow-auto px-4 md:px-0">
          <h2 className="text-3xl font-pally-medium mb-5">Upcoming Events</h2>
          <div className="flex lg:flex-row gap-6 overflow-x-auto w-full pb-8">
            {cardData.map((card) => (
              <CardComponent key={card.id} {...card} />
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default TailoredEvent;
