"use client";

import Layout from "@/components/layout";
import Image from "next/image";
import React, { useState } from "react";
import EventFilterComponent from "@/components/page-components/eventpage/EventFilterComponent";
import CardComponent from "@/components/CardComponent";
import EventListComponent from "@/components/page-components/eventpage/EventListComponent";
import Container from "@/tw-components/container";
import CardSkeleton from "@/tw-components/skeleton/CardSkeleton";
import { useFilteredEvents } from "@/hooks/events/useFilterEvents";
import FilterEventComponent from "@/components/page-components/eventpage/FilterEventComponent";
import { Button } from "@/components/ui/button";

const ExploreEventsPage = () => {
  const [isGridView, setIsGridView] = useState(true);

  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    locationType: "",
    eventType: "",
    startDate: null,
    endDate: null,
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

  console.log(events?.data);

  const handleRefresh = () => {
    setFilters({
      minPrice: null,
      maxPrice: null,
      locationType: "",
      eventType: "",
      startDate: null,
      endDate: null,
    });
  };

  if (isError) {
    return <div>Error loading events</div>;
  }
  return (
    <Layout title="Explore events" showHeader showFooter>
      {/*Explore Events Layout*/}
      <Container className="flex-col mt-5 mb-5">
        <div className="flex gap-3 items-center justify-between">
          <FilterEventComponent onApplyFilters={handleApplyFilters} />
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
        <div className="px-0 md:px-6">
          <div className="flex gap-5 mt-6">
            <EventFilterComponent onApplyFilters={handleApplyFilters} />
            <div className="w-full">
              {isGridView ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 justify-items-center mt-3 w-full">
                  {isLoading ? (
                    <CardSkeleton />
                  ) : (
                    <>
                      {publishedEvents?.length !== 0 ? (
                        publishedEvents?.map((card) => (
                          <CardComponent key={card._id} card={card} />
                        ))
                      ) : (
                        <div className="w-full flex flex-col items-center justify-center gap-3">
                          <p className="font-pally-regular">
                            No event uploaded
                          </p>
                          <Button onClick={handleRefresh} variant="destructive">
                            Refresh
                          </Button>
                        </div>
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
                        <div className="flex flex-col items-center gap-3">
                          <p className="font-pally-regular">
                            No event uploaded
                          </p>
                          <Button onClick={handleRefresh} variant="destructive">
                            Refresh
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ExploreEventsPage;
