import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Container from "@/tw-components/container";
import { organiserData } from "@/static-datas/organiser-date";
import HomeTabCard from "./HomeTabCard";

const tabLink = [
  { title: "Upcoming Events", key: "upcoming" },
  { title: "Currently Happening", key: "current" },
];

const HomeTabs = () => {
  const [isActive, setIsActive] = useState<string>("upcoming");
  return (
    <Container>
      <ul className="flex justify-start items-center gap-4 align-baseline">
        {tabLink.map((tab) => (
          <li key={tab.key} role="presentation">
            <button
              className={`font-pally-regular py-2 px-3 rounded-3xl ${
                isActive === tab.key
                  ? "border border-[#101928]  text-[#101928]"
                  : " text-[#586170] "
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
        <Select onValueChange={(value) => setIsActive(value)}>
          <SelectTrigger className="w-[180px] border-none rounded-full font-pally-regular text text-[#586170] shadow-none">
            <SelectValue placeholder="Select Date" className="" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectLabel>Select date</SelectLabel>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="30">This month</SelectItem>
              <SelectItem value="60">Last month</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </ul>

      <div
        id={`panel-${isActive}`}
        role="tabpanel"
        aria-labelledby={`tab-${isActive}`}
        className="mt-6 md:mt-10 flex flex-col gap-5 overflow-x-auto w-full pb-8"
      >
        {organiserData[0].organiserEvents.map((card) => (
          <HomeTabCard key={card.id} />
        ))}
      </div>
    </Container>
  );
};

export default HomeTabs;
