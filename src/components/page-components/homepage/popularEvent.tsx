"use client";

import CardComponent from "@/components/CardComponent";
import { cardData } from "@/static-datas/cards-data";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import React, { useState } from "react";

const PopularEvent = () => {
  // Define state fo tab
  const [isActive, setIsActive] = useState<string>("physical");

  const tabLink = [
    { title: "Physical", key: "physical" },
    { title: "Virtual", key: "virtual" },
    { title: "Pre-sale", key: "pre-sale" },
  ];

  return (
    <Section id="popular-event" className="p-0 overflow-hidden">
      <div className="bg-pitchNoise backdrop-blur-md">
        <Container className="px-4 md:px-0 py-8 md:py-16 overflow-auto">
          <h2 className="text-3xl font-pally-medium mb-5">Popular Events</h2>
          <ul className="flex justify-start items-center gap-4 align-baseline">
            {tabLink.map((tab) => (
              <li key={tab.key} role="presentation">
                <button
                  className={`border py-2 px-3 rounded-3xl ${
                    isActive === tab.key
                      ? "border-2 border-[#D9302A] text-[#D9302A]"
                      : "border-[#586170] text-[#586170]"
                  }`}
                  role="tab"
                  aria-selected={isActive === tab.key}
                  aria-controls={`panel-${tab.key}`}
                  id={`tab-${tab.key}`}
                  onClick={() => setIsActive(tab.key)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setIsActive(tab.key);
                    }
                  }}
                >
                  {tab.title}
                </button>
              </li>
            ))}
            
          </ul>
          <div
            id={`panel-${isActive}`}
            role="tabpanel"
            aria-labelledby={`tab-${isActive}`}
            className="mt-6 md:mt-10 flex lg:flex-row gap-5 overflow-x-auto w-full pb-8"
          >
            {cardData.slice(0, 4).map((card) => (
              <CardComponent key={card.id} {...card} />
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default PopularEvent;
