"use client";

import { Button } from "@/components/ui/button";
import Container from "@/tw-components/container";
import React from "react";
import { motion } from "framer-motion";

const items = [
  {
    id: 1,
    label: "Easy Event Setup",
    color: "bg-[rgba(255,84,3,0.05)] border-orange-500",
    position: "top-0 left-48 md:left-96",
    mobilePosition: "top-0 right-10",
    rotate: [-8, 36, -8],
  },
  {
    id: 2,
    label: "Real-Time Analytics",
    color: "bg-[#FEF4E4] border-[#FBB448]",
    position: "top-3 md:top-56 left-3 md:left-20",
    mobilePosition: "top-10 left-20",
    rotate: [-13, 10, -13],
  },
  {
    id: 3,
    label: "Marketing Tools",
    color: "bg-[#E4E7EC] border-[#515A6A]",
    position: "top-32 left-48 md:left-56",
    mobilePosition: "top-32 right-10",
    rotate: [40, -20, 40],
  },
  {
    id: 4,
    label: "Customizable Tickets",
    color: "bg-[#E4EBFF] border-[#4D77FF]",
    position: "top-56 md:top-56 left-24 md:left-96",
    mobilePosition: "top-64 right-12",
    rotate: [9, -30, 9],
  },
  {
    id: 5,
    label: "Secure Payments",
    color: "bg-[#F0EDFC] border-[#765FBE]",
    position: "top-28 left-3 md:top-0 lg:left-20",
    mobilePosition: "top-0 left-6",
    rotate: [16, -8, 16],
  },
  {
    id: 6,
    label: "Discover Events",
    color: "bg-[#F3D8C9] border-orange-500",
    position: "top-0 left-48 md:left-96",
    mobilePosition: "top-0 right-10",
    rotate: [-8, 36, -8],
  },
  {
    id: 7,
    label: "Simple Ticket Purchase",
    color: "bg-[#FEF4E4] border-[#FBB448]",
    position: "top-3 md:top-56 left-3 md:left-20",
    mobilePosition: "top-10 left-20",
    rotate: [-13, 10, -13],
  },
  {
    id: 8,
    label: "Mobile Tickets",
    color: "bg-[#E4E7EC] border-[#515A6A]",
    position: "top-32 left-48 md:left-56",
    mobilePosition: "top-32 right-10",
    rotate: [40, -20, 40],
  },
  {
    id: 9,
    label: "Personalized Recommendations",
    color: "bg-[#E4EBFF] border-[#4D77FF]",
    position: "top-56 md:top-56 left-16 md:left-96",
    mobilePosition: "top-64 right-12",
    rotate: [9, -10, 9],
  },
  {
    id: 10,
    label: "Customer Support",
    color: "bg-[#F0EDFC] border-[#765FBE]",
    position: "top-28 left-3 md:top-0 lg:left-20",
    mobilePosition: "top-0 left-6",
    rotate: [16, -8, 16],
  },
];

const WhatWeOffter = () => {
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
  return (
    <div className="bg-whiteNoise">
      <Container className="py-8 px-4 md:py-20 md:px-0">
        <h2 className="text-3xl font-pally-medium text-center destructive">
          WHAT WE OFFER
        </h2>
        <ul className="mt-7 md:mt-12 flex flex-col md:flex-row justify-center gap-4 md:gap-8">
          <li className="bg-pitchNoise rounded-lg h-[550px] md:h-[640px]">
            <div className="p-5 md:py-16 md:px-12 space-y-4">
              <h3 className="font-pally-medium text-3xl">For Organizers</h3>
              <p className="font-pally-regular text-[#586170] text-base md:text-lg">
                Our user-friendly software selects event listings based on your
                location or top priorities, making your search much more fun.
              </p>
              <Button variant="outline">Learn more</Button>
            </div>
            <ul className="w-[30%] p-0 list-none relative ">
              {items.slice(0, 5).map((item) => (
                <motion.li
                  key={item.id as number}
                  className={`absolute ${item.position} ${item.color} border-2 rounded-full py-2.5 px-5 font-pally-regular whitespace-nowrap`}
                  variants={variants(item.rotate)}
                  animate="animate"
                >
                  {item.label}
                </motion.li>
              ))}
            </ul>
          </li>
          <li className="bg-[#231B15] rounded-lg h-[550px] md:h-[640px]">
            <div className="p-5 md:py-16 md:px-12 space-y-4">
              <h3 className="font-pally-medium text-3xl text-white">
                For Organizers
              </h3>
              <p className="font-pally-regular text-base md:text-lg text-white">
                Our user-friendly software selects event listings based on your
                location or top priorities, making your search much more fun.
              </p>
              <Button
                variant="outline"
                className="border-white text-white font-pally-regular"
              >
                Learn more
              </Button>
            </div>
            <ul className="w-[30%] p-0 list-none relative ">
              {items.slice(5, 10).map((item) => (
                <motion.li
                  key={item.id as number}
                  className={`absolute ${item.position} ${item.color} border-2 rounded-full py-2.5 px-5 font-pally-regular whitespace-nowrap`}
                  variants={variants(item.rotate)}
                  animate="animate"
                >
                  {item.label}
                </motion.li>
              ))}
            </ul>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default WhatWeOffter;
