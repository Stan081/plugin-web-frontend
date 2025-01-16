"use client";
import Container from "@/tw-components/container";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const resources = [
  {
    image:
      "https://ik.imagekit.io/pluginImage/Plugin-images/image%20243.png?updatedAt=1728027947271",
    bgColor: "#E3EFFC",
    title: " Creating Tickets",
    description:
      "This guide will show you how to create and edit ticket types for your event",
    path: "/organiser",
  },
  {
    image:
      "https://ik.imagekit.io/pluginImage/Plugin-images/image%20244.png?updatedAt=1728027947293",
    bgColor: "#FFF1F0",
    title: " Scanning and Check In",
    description:
      "This course guides you how to use the Plugin scanner to scan tickets and check-in attendees for your event.",
    path: "/organiser",
  },
  {
    image:
      "https://ik.imagekit.io/pluginImage/Plugin-images/image%20246.png?updatedAt=1728027947285",
    bgColor: "#E6FDEE",
    title: "Getting Paid via Plugin",
    description:
      "This guide will walk you through how to add a payout method to your event if you're selling tickets using Plugin's Payment Processing.",
    path: "/organiser",
  },
];

const ResourceTips = () => {
  return (
    <div className="bg-violet-200 py-12">
      <Container>
        <h2 className="font-pally-medium text-[#2E394C] text-3xl">
          {" "}
          💡 Resource and tips
        </h2>
        <ul className="mt-6 flex flex-col lg:flex-row items-center gap-6">
          {resources.map((tip, index) => (
            <li key={index} className="flex-1 border rounded-xl block ">
              <div
                style={{ backgroundColor: tip.bgColor }}
                className=" flex justify-center px-8 rounded-tr-xl rounded-tl-xl"
              >
                <Image
                  src={tip.image}
                  alt={tip.title}
                  width={278}
                  height={278}
                  className="pointer-events-none w-56 h-56 rounded-tr-xl rounded-tl-xl"
                />
              </div>
              <div className="bg-white p-4 md:p-6 spacey-y-6">
                <div className="space-y-2 h-28">
                  <p className="text-[#2E394C] font-pally-medium text-xl">
                    {tip.title}
                  </p>
                  <p className="text-[#475367] font-pally-regular text-sm md:text-base">
                    {tip.description}
                  </p>
                </div>

                <Link
                  href={tip.path}
                  className=" mt-5 font-pally-regular text-[#D9302A] flex items-center gap-2"
                >
                  Learn more{" "}
                  <span>
                    <MdKeyboardArrowRight />
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default ResourceTips;
