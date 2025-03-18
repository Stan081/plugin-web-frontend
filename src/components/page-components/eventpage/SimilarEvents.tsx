import CardComponent from "@/components/CardComponent";
import { useFilteredEvents } from "@/hooks/events/useFilterEvents";
import React, { useState } from "react";

const SimilarEvents = () => {

  // Temporary
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    locationType: "",
    eventType: "",
    startDate: null,
    endDate: null,
    page: 1,
    eventName: "",
  });
  const { data: events, isLoading, isError } = useFilteredEvents(filters);

  console.log(events)
  return (
    <div className="mt-10 md:mt-20 overflow-auto">
      <h2 className="text-3xl font-pally-medium mb-6">Similar Events</h2>
      <div className="flex lg:flex-row gap-6 overflow-x-auto w-full pb-8">
        {events?.data?.map((card) => (
          <CardComponent key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default SimilarEvents;
