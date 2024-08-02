"use client";

import Image from "next/image";
import React from "react";

const items = [
  {
    id: "1",
    title: "20K+",
    description: "Event organizers",
    icon: "/images/team-puzzle.png",
    bgColor: "#E3F4F1",
  },
  {
    id: "2",
    title: "20K+",
    description: "Events hosted",
    icon: "/images/calendar-management.png",
    bgColor: "#E6ECF8",
  },
  {
    id: "1",
    title: "20K+",
    description: "Ticket sold",
    icon: "/images/cinema-tickets.png",
    bgColor: "#FAF1E1",
  },
];

const WhoWeAre = () => {
  return (
    <div className="py-8 px-4 md:py-20 md:px-0">
      <h2 className="text-3xl font-pally-medium text-center destructive">
        WHO WE ARE
      </h2>
      <h3 className="mt-5 text-xl md:text-3xl font-pally-regular md:font-pally-medium text-center md:max-w-4xl mx-auto">
        We believe in the power of live events to bring people together, and we
        strive to make the process of organizing and attending these events as
        smooth and enjoyable as possible.
      </h3>

      <ul className="mt-7 md:mt-20 flex flex-col md:flex-row justify-center items-center gap-6">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ backgroundColor: `${item.bgColor}` }}
            className="px-5 py-3 md:py-5 flex items-center gap-4 w-96 rounded-lg"
          >
            <Image
              src={`${item.icon}`}
              width={96}
              height={100}
              alt={`${item.title}`}
              className="filter grayscale pointer-events-none"
            />

            <div className="space-y-3">
                <p className="font-pally-bold text-[#2C2B2E] text-xl">{item.title}</p>
                <p className="font-pally-regular text-base md:text-lg text-[#475367]">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhoWeAre;
