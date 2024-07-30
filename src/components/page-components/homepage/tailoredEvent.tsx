import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Container from "@/tw-components/container";
import { tailoredEvents } from "@/static-datas/tailored-data";
import { cardData } from "@/static-datas/cards-data";
import CardComponent from "@/components/CardComponent";

const TailoredEvent: React.FC = () => {
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
      <Container className="lg:hidden inline-block py-8 md:py-16">
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
            {tailoredEvents.slice(0, 4).map((item) => (
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
            {tailoredEvents.slice(4, 8).map((item) => (
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
    <div className="bg-whiteNoise bg-cover backdrop-blur-md">
      {/* For desktop view */}
      <Container className="hidden lg:block py-8 md:py-16">
        <div className="flex justify-between gap-10 w-full mx-auto">
          <ul className="w-[25%] p-0 list-none relative ">
            {tailoredEvents.slice(0, 4).map((item) => (
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
            {tailoredEvents.slice(4, 8).map((item) => (
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

      {/* For mobile view */}
      <EventMobile />

      <Container className="mt-20">
        <h2 className="text-3xl font-pally-medium mb-5">Upcoming Events</h2>
        <div className="text-3xl font-pally-medium flex flexx-col lg:flex-row gap-6">
          {cardData.map((card) => (
            <CardComponent key={card.id} {...card} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TailoredEvent;
