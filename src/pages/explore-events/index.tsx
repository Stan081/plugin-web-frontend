import Layout from "@/components/layout";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { cardData } from "@/static-datas/cards-data";
import EventFilterComponent from "@/components/page-components/eventpage/EventFilterComponent";
import CardComponent from "@/components/CardComponent";
import EventListComponent from "@/components/page-components/eventpage/EventListComponent";

const ExploreEventsPage = () => {
  const [isGridView, setIsGridView] = useState(true);

  const handleToggleView = () => {
    setIsGridView((prevView) => !prevView);
  };

  return (
    <Layout title="Explore events" showHeader showFooter>
      {/*Explore Events Layout*/}
      <div className="flex-col px-20 mt-5 mb-5">
        <div className="flex gap-3 items-center">
          {/*show map switch*/}
          <div className="flex p-2.5 gap-1.5 border rounded-full w-40 justify-between">
            <p className="text-sm md:text-lg text-gray-500 font-pally-regular">
              Show Map
            </p>
            <Switch />
          </div>
          <div className="flex gap-20 flex-1 justify-between">
            {/*Enter name & Location*/}
            <div className="flex gap-2 items-center">
              <div>
                <Input
                  placeholder="Event name"
                  type="text"
                  id="event_name"
                  className="w-64"
                />
              </div>
              <div className="border border-gray-300 rotate-0 h-5 hidden lg:block" />
              <div>
                <Input
                  placeholder="Enter location "
                  type="text"
                  id="event_location"
                  className="w-64"
                />
              </div>
            </div>
            {/*Toggle between list and grid*/}
            <div
              className="flex p-2.5 gap-1.5 border rounded-full w-40 justify-between cursor-pointer"
              onClick={handleToggleView}
            >
              <p className="text-sm md:text-lg text-gray-500 font-pally-regular">
                {isGridView ? "Show as list" : "Show as grid"}
              </p>
              <Image
                src={
                  isGridView ? "/images/list-icon.svg" : "/images/grid-icon.svg"
                }
                width={20}
                height={20}
                alt="Toggle View Icon"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-10">
          {/*Filter Components*/}
          <div>
            <EventFilterComponent />
          </div>
          {/*Event Grid Cards*/}
          <div className="w-full">
            {isGridView ? (
              <div className="grid grid-cols-3 gap-4 pb-8 mt-3">
                {cardData.map((card) => (
                  <CardComponent key={card.id} {...card} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4 pb-8 mt-3">
                {cardData.map((card) => (
                  <EventListComponent key={card.id} {...card} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExploreEventsPage;
