"use client";

import Layout from "@/components/layout";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import EventFilterComponent from "@/components/page-components/eventpage/EventFilterComponent";
import CardComponent from "@/components/CardComponent";
import EventListComponent from "@/components/page-components/eventpage/EventListComponent";
import Container from "@/tw-components/container";
import { useGetAllEvents } from "@/hooks/events/useGetAllEvents";
import CardSkeleton from "@/tw-components/skeleton/CardSkeleton";
import { useFilteredEvents } from "@/hooks/events/useFilterEvents";

const ExploreEventsPage = () => {
  // const { data: events, isLoading } = useGetAllEvents();
  const [isGridView, setIsGridView] = useState(true);

  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    locationType: "",
    eventType: "",
  });

  const { data: events, isLoading, isError } = useFilteredEvents(filters);

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters); // Update filters dynamically
  };

  const handleToggleView = () => {
    setIsGridView((prevView) => !prevView);
  };

  const publishedEvents: any[] = events?.data?.filter((item) => {
    return item?.isPublished === true;
  });

  const isEmpty = !events?.data || events.data.length === 0;

  if (isError) {
    return <div>Error loading events</div>;
  }
  return (
    <Layout title="Explore events" showHeader showFooter>
      {/*Explore Events Layout*/}
      <div className="flex-col px-20 mt-5 mb-5">
        <div className="flex gap-3 items-center justify-end">
          {/* <div className="flex py-1.5 px-2.5 items-center gap-1.5 border rounded-full w-40 justify-between">
            <p className="text-sm md:text-lg text-gray-500 font-pally-regular">
              Show Map
            </p>
            <Switch />
          </div> */}
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
          {isEmpty ? (
            <div>No events found for the selected filters.</div>
          ) : (
            events?.data?.map((event) => (
              <div key={event.id} className="event-card">
                {/* Render your event details here */}
                <h2>{event.title}</h2>
                <p>{event.date}</p>
                <p>{event.location}</p>
              </div>
            ))
          )}
          <div className="flex gap-5 mt-6">
            <EventFilterComponent onApplyFilters={handleApplyFilters} />
            <div className="w-full">
              {isGridView ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8 mt-3">
                  {isLoading ? (
                    <CardSkeleton />
                  ) : (
                    <>
                      {publishedEvents?.length !== 0 ? (
                        publishedEvents?.map((card) => (
                          <CardComponent key={card._id} card={card} />
                        ))
                      ) : (
                        <p>No event uploaded</p>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-6 pb-8 mt-3">
                  {isLoading ? (
                    <CardSkeleton />
                  ) : (
                    <>
                      {publishedEvents?.length !== 0 ? (
                        publishedEvents?.map((card) => (
                          <EventListComponent key={card._id} card={card} />
                        ))
                      ) : (
                        <p>No event uploaded</p>
                      )}
                    </>
                  )}
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
