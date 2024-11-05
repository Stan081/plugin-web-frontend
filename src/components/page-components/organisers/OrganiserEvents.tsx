import CardComponent from "@/components/CardComponent";
import { cardData } from "@/static-datas/cards-data";
import React, { useState } from "react";

const OrganiserEvents = () => {
  // Define state fo tab
  const [isActive, setIsActive] = useState<string>("upcoming");

  const tabLink = [
    { title: "Upcoming event", key: "upcoming" },
    { title: "Past event", key: "past" },
  ];
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full mx-auto gap-8 ">
      <div className="w-[380px] ml-40 h-[580px]" />
      <div className="w-full max-w-5xl mt-3 lg:mt-4">
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
          className="mt-6 md:pb-20 pb-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  h-[80vh] md:h-full mx-auto"
        >
          {/* {cardData.map((card) => (
            <CardComponent key={card.id} {...card} />
          ))} */}
          working...
        </div>
      </div>
    </div>
  );
};

export default OrganiserEvents;
