import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Container from "@/tw-components/container";

const TailoredEvent: React.FC = () => {
  const items = [
    {
      id: 1,
      label: "Concerts",
      color: "bg-[rgba(255,84,3,0.05)] border-orange-500",
      position: "top-0 right-20",
      rotate: [-8, 36, -8],
    },
    {
      id: 2,
      label: "Religion",
      color: "bg-[#F6DDE5] border-[#FA7070]",
      position: "top-28 left-10",
      rotate: [-13, 10, -13],
    },
    {
      id: 3,
      label: "Business",
      color: "bg-[#E4E7EC] border-[#515A6A]",
      position: "top-32 left-56",
      rotate: [40, -20, 40],
    },
    {
      id: 4,
      label: "Campaign",
      color: "bg-[#E4EBFF] border-[#4D77FF]",
      position: "top-64 left-32",
      rotate: [9, -30, 9],
    },
    {
        id: 5,
        label: "Others",
        color: "bg-[rgba(255,84,3,0.05)] border-orange-500",
        position: "top-0 left-20",
        rotate: [16, -8, 16]
      },
      {
        id: 6,
        label: "Parties",
        color: "bg-[#E4EBFF] border-[#4D77FF]",
        position: "top-28 right-80",
        rotate: [44, -20, 44]
      },
      {
        id: 7,
        label: "Hangout",
        color: "bg-[#F6DDE5] border-[#FA7070]",
        position: "top-32 left-40",
        rotate: [-16, 33, -16]
      },
      {
        id: 8,
        label: "Corporate",
        color: "bg-[#E4E7EC] border-[#515A6A]",
        position: "top-64 left-20",
        rotate: [9, -30, 9]
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
            <Button variant="outline">
              Explore events
            </Button>
          </div>
        </div>
        <div className="flex py-8 justify-center gap-20 h-96">
          <ul className="w-[100px] space-y-6 p-0 list-none relative ">
            {items.slice(0, 4).map((item) => (
              <motion.li
                key={item.id}
                className={`${item.position} ${item.color} border-2 rounded-full py-2.5 px-5 font-pally-regular`}
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
                className={`${item.position} ${item.color} border-2 rounded-full py-2.5 px-5 font-pally-regular mx-auto`}
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
            {items.slice(0,4).map((item) => (
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
              <Button variant="outline">
                Explore events
              </Button>
            </div>
          </div>

          <ul className="w-[25%] p-0 list-none relative ">
            {items.slice(4,8).map((item) => (
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
      <EventMobile/>
    </div>
  );
};

export default TailoredEvent;
