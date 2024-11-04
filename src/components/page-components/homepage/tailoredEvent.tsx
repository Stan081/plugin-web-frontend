"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { cardData } from "@/static-datas/cards-data";
import CardComponent from "@/components/CardComponent";
import Link from "next/link";
import { useGetAllEvents } from "@/hooks/events/useGetAllEvents";
import { UIitems } from "@/static-datas/tailored-data";

const TailoredEvent: React.FC = () => {
  const { data: events } = useGetAllEvents();
  const [getPublished, setGetPublished] = useState<any[]>(events?.data);


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
      </Container>
    );
  };

  return (
    <Section id="our-tailored-events" className="isolate p-0">
      <div className="bg-whiteNoise bg-cover backdrop-blur-md py-8 md:py-20">
        {/* For desktop view */}
        <Container className="hidden lg:block">
          <div className="flex justify-between gap-10 w-full mx-auto">
            <ul className="w-[25%] p-0 list-none relative ">
              {UIitems.slice(0, 4).map((item) => (
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

            <div className="mx-auto w-full md:w-[25%] flex flex-col gap-4 mt-5 md:mt-10">
              <h2 className="font-pally-medium text-[36px] text-center">
                Events tailored to <br /> your{" "}
                <span className="text-[#765fbe]">preferences</span>
              </h2>
              <p className="font-pally-regular text-base md:text-lg text-center mx-auto">
                Our user-friendly software selects event listings based on your
                location or top priorities, making your search much more fun.
              </p>
              <div className="mx-auto">
                <Link href="/explore-events">
                  <Button variant="outline">Explore events</Button>
                </Link>
              </div>
            </div>

            <ul className="w-[25%] p-0 list-none relative ">
              {UIitems.slice(4, 8).map((item) => (
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
        <Container className="mt-20 md:mt-40 overflow-auto px-4 md:px-0">
          <h2 className="text-3xl font-pally-medium mb-6">Upcoming Events</h2>
          <div className="flex lg:flex-row gap-6 overflow-x-auto scroll-smooth whitespace-nowrap w-full pb-8">
            {events?.data.map((card) => (
              <CardComponent key={card.id} card={card} />
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default TailoredEvent;
