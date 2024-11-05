import Layout from "@/components/layout";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { cardData } from "@/static-datas/cards-data";
import EventFilterComponent from "@/components/page-components/eventpage/EventFilterComponent";
import CardComponent from "@/components/CardComponent";
import EventListComponent from "@/components/page-components/eventpage/EventListComponent";
import Container from "@/tw-components/container";

const ExploreEventsPage = () => {
  const [isGridView, setIsGridView] = useState(true);

  const handleToggleView = () => {
    setIsGridView((prevView) => !prevView);
  };

  return (
    <Layout title="Explore events" showHeader showFooter>
      {/*Explore Events Layout*/}
      <div className="flex-col px-20 mt-5 mb-5">
        <div className="flex gap-3 items-center justify-between">
          {/*show map switch*/}
          <div className="flex py-1.5 px-2.5 items-center gap-1.5 border rounded-full w-40 justify-between">
            <p className="text-sm md:text-lg text-gray-500 font-pally-regular">
              Show Map
            </p>
            <Switch />
          </div>
          <div
            className="flex py-1.5 px-2.5 gap-1.5 border rounded-full w-40 justify-between cursor-pointer"
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
        <Container className="px-0 md:px-6">
          <div className="flex gap-5 mt-10">
            <EventFilterComponent />
            <div className="w-full">
              {isGridView ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8 mt-3">
                  {cardData.map((card) => (
                    <p>hello</p>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-6 pb-8 mt-3">
                  {cardData.map((card) => (
                    <EventListComponent key={card.id} {...card} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default ExploreEventsPage;
