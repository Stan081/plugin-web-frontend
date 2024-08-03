"use client";
import { Section } from "@/tw-components/Seaction";

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

// Temporay mock data
const heroSlides = [
  {
    backgroundImage:
      "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image1.png?updatedAt=1722389173816",
    logo: "/images/cream-bg.png",
    title: "AFRONATION “24",
    quote: "",
  },
  {
    backgroundImage:
      "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image2.jpeg?updatedAt=1722389363583",
    logo: "/images/cream-bg.png",
    title: "Another Event",
    quote: "",
  },
  {
    backgroundImage:
      "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image3.jpeg?updatedAt=1722389364580",
    logo: "/images/cream-bg.png",
    title: "Yet Another Event",
    quote: "ent.",
  },
];
const OurCustomers = () => {
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
    <Section id="hero section" className="isolate overflow-hidden">
        <Container>
            <Carousel>
                <CarouselContent>
                    
                </CarouselContent>
            </Carousel>
        </Container>
    </Section>
  );
};

export default OurCustomers;
