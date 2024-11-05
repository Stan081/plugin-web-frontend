import CardComponent from "@/components/CardComponent";
import { cardData } from "@/static-datas/cards-data";
import React from "react";

const SimilarEvents = () => {
  return (
    <div className="mt-20 md:mt-40 overflow-auto">
      <h2 className="text-3xl font-pally-medium mb-6">Similar Events</h2>
      <div className="flex lg:flex-row gap-6 overflow-x-auto w-full pb-8">
        {/* {cardData.map((card) => (
          <CardComponent key={card.id} {...card} />
        ))} */}
        Working on this section next
      </div>
    </div>
  );
};

export default SimilarEvents;
