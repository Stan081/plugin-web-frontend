"use client";

import CardComponent2 from "@/components/CardComponent2";
import { useFilteredEvents } from "@/hooks/events/useFilterEvents";
import { useGetAllEvents } from "@/hooks/events/useGetAllEvents";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import CardSkeleton from "@/tw-components/skeleton/CardSkeleton";
import React, { useState } from "react";

const tabLink = [
  { title: "Physical", key: "physical" },
  { title: "Virtual", key: "virtual" },
];

const PopularEvent = () => {
  const [isActive, setIsActive] = useState<string>("physical");
  const [filters] = useState({
    eventName: "",
  });
  const { data: events, isLoading, isError } = useFilteredEvents(filters);

  const physicalPublishedType = events?.data.filter((item) => {
    return item?.locationType === "physical";
  });

  const onlinePublishedType = events?.data.filter((item) => {
    return item?.locationType === "online";
  });

  return (
    <Section id="popular-event" className="p-0 overflow-hidden">
      <div className="bg-pitchNoise backdrop-blur-md">
        <Container className="px-4 md:px-0 py-8 md:py-16 overflow-auto">
          <h2 className="text-3xl font-pally-medium mb-5">Popular Events</h2>
          <ul className="flex justify-start items-center gap-4 align-baseline">
            {tabLink.map((tab) => (
              <li key={tab.key} role="presentation">
                <button
                  className={`border py-1 px-2 md:py-2 md:px-3 rounded-3xl ${
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
            {isActive === "physical" && (
              <>
                {isLoading ? (
                  <CardSkeleton />
                ) : (
                  <>
                    {physicalPublishedType?.length > 0 &&
                      physicalPublishedType.map((card) => (
                        <CardComponent2 key={card.id} card={card} />
                      ))}
                  </>
                )}
              </>
            )}

            {isActive === "virtual" && (
              <>
                {isLoading ? (
                  <CardSkeleton />
                ) : (
                  <>
                    {onlinePublishedType?.length > 0 ? (
                      onlinePublishedType.map((card) => (
                        <CardComponent2 key={card.id} card={card} />
                      ))
                    ) : (
                      <p className="font-pally-regular text-center">
                        No online event yet
                      </p>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default PopularEvent;
