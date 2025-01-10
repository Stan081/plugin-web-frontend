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
  const [pageNum, setPageNum] = useState<number>(1);

  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    locationType: "",
    eventType: "",
    startDate: null,
    endDate: null,
    page: pageNum,
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

  console.log(events);

  const handleRefresh = () => {
    setFilters({
      minPrice: null,
      maxPrice: null,
      locationType: "",
      eventType: "",
      startDate: null,
      endDate: null,
      page: 1,
    });
  };

  const handlePrev = () => {
    setPageNum((prevNum) => {
      if (prevNum <= 1) {
        return prevNum;
      }
      return prevNum - 1;
    });
  };
  const handleNext = () => {
    setPageNum((prevNum) => prevNum + 1);
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
          {events?.data.length > 0 && (
            <div className="flex justify-between items-center whitespace-nowrap w-full overflow-x-auto pb-4 mt-6">
              <p className="text-sm text-gray-600">
                Page {events?.pagination?.currentPage} of{" "}
                {events?.pagination?.pageSize}
              </p>
              <div className="flex space-x-2">
                <Button onClick={handlePrev} variant="outline" size="icon">
                  {"<"}
                </Button>
                {[1, 2, 3, 4].map((page, index) => (
                  <Button
                    key={index}
                    variant={
                      page === events?.pagination?.currentPage
                        ? "default"
                        : "outline"
                    }
                    size="icon"
                    className={
                      page === events?.pagination?.currentPage
                        ? "bg-destructive text-white"
                        : ""
                    }
                  >
                    {page}
                  </Button>
                ))}
                <Button onClick={handleNext} variant="outline" size="icon">
                  {">"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default ExploreEventsPage;
