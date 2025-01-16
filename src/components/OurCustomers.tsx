"use client";

import { Section } from "@/tw-components/Section";
import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import Container from "@/tw-components/container";
import Image from "next/image";
import { Progress } from "./ui/progress";

// Tempoorary mock data
const customers = [
  {
    customerImage:
      "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image1.png?updatedAt=1722389173816",
    logo: "/images/cream-bg.png",
    name: "Ashley Young",
    position: "Palms home and resort",
    quote:
      "I love to list out my properties for rent with Gupa because of the good policies they have and also i can report guest mis-conduct swiftly",
  },
  {
    customerImage:
      "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image2.jpeg?updatedAt=1722389363583",
    logo: "/images/cream-bg.png",
    name: "Kenice Plugin",
    position: "Plugin dir",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, iste minima consequuntur nesciunt recusandae natus rerum beatae reiciendis quae, amet molestiae quam quod id aspernatur repudiandae ab aliquid iusto corporis.",
  },
  {
    customerImage:
      "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image3.jpeg?updatedAt=1722389364580",
    logo: "/images/cream-bg.png",
    name: "Stanley DEV",
    position: "CTO Plugin",
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, iste minima consequuntur nesciunt recusandae natus rerum beatae reiciendis quae, amet molestiae quam quod id aspernatur repudiandae ab aliquid iusto corporis.",
  },
];

const OurCustomers = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }; 

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setActiveIndex((prevIndex) =>
          prevIndex === customers.length - 1 ? 0 : prevIndex + 1
        ),
      3000
    );

    return () => {
      resetTimeout();
    };
  }, [activeIndex]);

  const handleSlideChange = (newIndex: number) => {
    setActiveIndex(newIndex);
  };
  return (
    <Section id="hero section" className="isolate overflow-hidden">
      <div className="relative">
        <Carousel>
          <div className="">
            <Container className="py-10 px-4 md:py-16 md:px-0">
              <div className="w-full max-w-3xl mx-auto space-y-5 mb-8 md:mb-16">
                <h2 className="text-center font-pally-medium text-4xl mx-auto">
                  Meet our amazing customers
                </h2>
                <p className="mx-auto font-pally-regular text-base md:text-lg text-[#586170] text-center md:max-w-xl">
                  Whether it&apos;s a concert, conference, or local gathering, Plugin
                  offers the essential tools for your event&apos;s success.
                </p>
              </div>
              <CarouselContent
                style={{ transform: `translateX(${-activeIndex * 100}%)` }}
              >
                {customers.map((customer, index) => (
                  <CarouselItem key={index}>
                    <div className="lg:px-48 flex flex-col-reverse lg:flex-row">
                      <div className="w-full lg:h-[560px] lg:w-2/3 bg-[#221A14] px-5 py-6 lg:p-16 rounded-br-2xl lg:rounded-br-none lg:rounded-tl-2xl rounded-bl-2xl">
                        <div className=" space-y-7 lg:space-y-20">
                          <h4 className=" md:h-56 text-white/80 font-pally-regular text-lg lg:text-xl">
                            “{customer.quote}”
                          </h4>
                          <div className="flex flex-col items-center md:items-start md:justify-start">
                            <p className="text-white font-pally-medium text-xl">
                              {customer.name}
                            </p>
                            <p className="text-[#D0D5DD] font-pally-medium text-base">
                              {customer.position}
                            </p>
                          </div>
                        </div>
                        <div className="mt-16 flex items-center justify-between gap-5">
                          <div className="w-48">
                            <Progress
                              value={(index + 1) * (100 / customers.length)}
                            />
                          </div>
                          <div className=" flex items-center justify-end gap-3">
                            <button
                              onClick={() =>
                                handleSlideChange(
                                  activeIndex === 0
                                    ? customers.length - 1
                                    : activeIndex - 1
                                )
                              }
                              className="cursor-pointer border rounded-full p-1 flex justify-center items-center w-9 h-9 border-white hover:bg-gray-600"
                            >
                              <RiArrowLeftSLine size={30} color="#fff" />
                            </button>

                            <button
                              onClick={() =>
                                handleSlideChange(
                                  (activeIndex + 1) % customers.length
                                )
                              }
                              className="cursor-pointer border rounded-full p-1 flex justify-center items-center w-9 h-9 border-white hover:bg-gray-600"
                            >
                              <RiArrowRightSLine size={30} color="#fff" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="w-full lg:w-1/2">
                        <Image
                          src={customer.customerImage}
                          width={224}
                          height={224}
                          alt={` ${customer.name}`}
                          className="w-full h-full object-cover pointer-events-none rounded-tr-2xl rounded-tl-2xl lg:rounded-tl-none lg:rounded-br-2xl"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Container>
          </div>
        </Carousel>
      </div>
    </Section>
  );
};

export default OurCustomers;
