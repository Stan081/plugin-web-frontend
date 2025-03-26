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
import { motion } from "framer-motion";
import HomeNavbar from "./HomeNavbar";

// Temporary mock data
const heroSlides = [
  {
    backgroundImage:
      "https://res.cloudinary.com/dbhbyikta/image/upload/v1742917303/WhatsApp_Image_2025-03-25_at_4.39.23_PM_1_fsphvb.jpg",
    logo: "/images/cream-bg.png",
    title: "PLUGIN “25",
    description: "The biggest Platform for entertainment.",
  },
  {
    backgroundImage:
      "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image2.jpeg?updatedAt=1722389363583",
    logo: "/images/pitch-bg.png",
    title: "Another Event",
    description: "Description for another event.",
  },
  {
    backgroundImage:
      "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image3.jpeg?updatedAt=1722389364580",
    logo: "/images/cream-bg.png",
    title: "Yet Another Event",
    description: "Description for yet another event.",
  },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      setHoveredIndex(null);
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setActiveIndex((prevIndex) =>
          prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
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
    <Section
      id="hero section"
      clean
      className="relative isolate overflow-hidden"
    >
      {heroSlides.length !== 0 ? (
        <div className=" bg-no-repeat bg-cover">
          <div className="bg-bgHero bg-cover bg-top lg:bg-bottom bg-no-repeat  w-full h-[70vh] lg:h-[85vh]">
            <Container className="flex flex-col justify-between h-full">
              <HomeNavbar/>
              <div className="w-full lg:w-1/2 mb-20">
                <h1 className="bg-[#F58986] inline-block px-3 lg:px-6 py-3 font-pally-medium text-3xl lg:text-6xl uppercase text-black">
                  Discover <br />
                </h1>
                <h2 className="bg-gradient-to-r from-[#F58986] to-[#ffffff]/90 px-3 lg:px-6 py-3 font-pally-medium text-3xl lg:text-6xl uppercase text-black w-full">
                  your next event
                </h2>
                <p className="mt-2 lg:mt-6 text-base lg:text-2xl font-pally-regular text-white uppercase lg:px-8">
                  With plugin entertainment
                </p>
              </div>
            </Container>
          </div>
        </div>
      ) : (
        <div className="relative">
          <Carousel>
            <div
              className="overflow-hidden"
              onMouseEnter={resetTimeout}
              onMouseLeave={() => {
                timeoutRef.current = setTimeout(
                  () =>
                    setActiveIndex((prevIndex) =>
                      prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
                    ),
                  3000
                );
              }}
            >
              <CarouselContent
                style={{ transform: `translateX(${-activeIndex * 100}%)` }}
              >
                {heroSlides.map((slide, index) => (
                  <CarouselItem
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div
                      className="relative h-[80vh] xs:max-md:h-[60vh] bg-no-repeat bg-center bg-cover flex items-center justify-start"
                      style={{
                        backgroundImage: `url(${slide.backgroundImage})`,
                      }}
                    >
                      {hoveredIndex === index && (
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                      )}
                      <Container>
                        <div className="relative z-10 text-center text-white p-4 flex flex-col items-start space-y-2 md:space-y-4">
                          {hoveredIndex === index ? (
                            <motion.div
                              animate={{ y: 0 }}
                              initial={{ y: -50 }}
                              transition={{ duration: 0.9, type: "spring" }}
                            >
                              <Image
                                src={slide.logo}
                                width={224}
                                height={224}
                                alt={`${slide.title} logo`}
                                className="w-24 h-24 md:w-56 md:h-56 mb-4"
                              />
                              <motion.div
                                animate={{ y: 0 }}
                                initial={{ y: 150 }}
                                transition={{ duration: 1.0, type: "spring" }}
                                className="text-left space-y-2"
                              >
                                <h1 className="text-3xl md:text-5xl font-pally-bold">
                                  {slide.title}
                                </h1>
                                <p className="text-lg mb-6 font-pally-regular text-start">
                                  {slide.description}
                                </p>
                                <button className="bg-red-500 text-white px-6 py-3 rounded-md font-pally-regular">
                                  Get Tickets Now
                                </button>
                              </motion.div>
                            </motion.div>
                          ) : (
                            <div className="w-24 h-24 md:w-56 md:h-56 mb-4 rounded-lg" />
                          )}
                        </div>
                      </Container>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute bottom-3 right-4 md:top-3/4 md:right-40 flex items-center gap-3"
              >
                <button
                  onClick={() =>
                    handleSlideChange(
                      activeIndex === 0
                        ? heroSlides.length - 1
                        : activeIndex - 1
                    )
                  }
                  className="cursor-pointer border rounded-full p-1 flex justify-center items-center w-9 h-9 border-white hover:bg-gray-600"
                >
                  <RiArrowLeftSLine size={30} color="#fff" />
                </button>

                <button
                  onClick={() =>
                    handleSlideChange((activeIndex + 1) % heroSlides.length)
                  }
                  className="cursor-pointer border rounded-full p-1 flex justify-center items-center w-9 h-9 border-white hover:bg-gray-600"
                >
                  <RiArrowRightSLine size={30} color="#fff" />
                </button>
              </div>
            </div>
          </Carousel>
        </div>
      )}
    </Section>
  );
};

export default HeroSection;
