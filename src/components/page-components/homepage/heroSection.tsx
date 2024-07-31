"use client";
import { Section } from "@/tw-components/Seaction";

import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import { ChevronRight } from "lucide-react";
import Container from "@/tw-components/container";


// Temporay mock data
const heroSlides = [
  {
    backgroundImage:
      "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image1.png?updatedAt=1722389173816",
    logo: "/images/cream-bg.png",
    title: "AFRONATION “24",
    description: "The biggest Afrobeat party in the world is here again.",
  },
  {
    backgroundImage:
      "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image2.jpeg?updatedAt=1722389363583",
    logo: "/images/cream-bg.png",
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
          prevIndex === heroSlides.length - 1 ? 0 : prevIndex + 1
        ),
      4000
    );

    return () => {
      resetTimeout();
    };
  }, [activeIndex]);

  const handleSlideChange = (newIndex: number) => {
    setActiveIndex(newIndex);
  };
  return (
    <Section id="hero section">
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
                <CarouselItem key={index}>
                  <div
                    className="relative h-[90vh] bg-no-repeat bg-left md:bg-center bg-cover flex items-center justify-start"
                    style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                  >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <Container>
                      <div className="relative z-10 text-center text-white p-4 flex flex-col items-start space-y-4">
                        <img
                          src={slide.logo}
                          alt={`${slide.title} logo`}
                          className="w-56 h-56 mb-4"
                        />
                        <h1 className="text-3xl md:text-5xl font-pally-bold">
                          {slide.title}
                        </h1>
                        <p className="text-lg mb-6 font-pally-regular text-start">
                          {slide.description}
                        </p>
                        <button className="bg-red-500 text-white px-6 py-3 rounded-md font-pally-regular">
                          Get Tickets Now
                        </button>
                      </div>
                    </Container>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselNext
            className="absolute hidden md:flex top-3/4 right-[8%] h-12 w-12 bg-gray-50 p-2 -translate-x-1/2 rounded-full cursor-pointer"
            onClick={() =>
              handleSlideChange((activeIndex + 1) % heroSlides.length)
            }
          >
            <ChevronRight size={40} color="#000" />
          </CarouselNext> */}
            <div className="absolute bottom-12 lg:bottom-48 right-0 md:right-[10%] transform -translate-x-1/2 flex space-x-2">
              {heroSlides.map((_, index) => (
                <span
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className={`cursor-pointer w-4 h-4 rounded-full ${
                    activeIndex === index
                      ? "bg-red-500"
                      : "bg-white bg-opacity-50"
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </Carousel>
      </div>
    </Section>
  );
};

export default HeroSection;
