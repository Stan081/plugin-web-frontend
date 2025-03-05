"use client";

import Layout from "@/components/layout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EventFilterComponent from "@/components/page-components/eventpage/EventFilterComponent";
import CardComponent from "@/components/CardComponent";
import EventListComponent from "@/components/page-components/eventpage/EventListComponent";
import Container from "@/tw-components/container";
import CardSkeleton from "@/tw-components/skeleton/CardSkeleton";
import { useFilteredEvents } from "@/hooks/events/useFilterEvents";
import FilterEventComponent from "@/components/page-components/eventpage/FilterEventComponent";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const ExploreEventsPage = () => {
  const searchParams = useSearchParams();
  const [isGridView, setIsGridView] = useState(true);

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

  useEffect(() => {
    const eventName = searchParams.get("eventName");
    const page = searchParams.get("page");

    setFilters((prevFilters) => ({
      ...prevFilters,
      eventName: eventName || "",
      page: page ? parseInt(page, 10) : 1,
    }));
  }, [searchParams]);

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters); // Update filters dynamically
  };

  const handleToggleView = () => {
    setIsGridView((prevView) => !prevView);
  };

  console.log(events?.data?.length)

  const handleRefresh = () => {
    setFilters({
      minPrice: null,
      maxPrice: null,
      locationType: "",
      eventType: "",
      startDate: null,
      endDate: null,
      page: 1,
      eventName: "",
    });
  };

  const incrementPage = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1,
    }));
  };

  const decrementPage = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: Math.max(prevFilters.page - 1, 1),
    }));
  };

  if (isError) {
    return <div>Error loading events</div>;
  }
  return (
    <Layout title="Explore events" showHeader showFooter>
      {/*Explore Events Layout*/}
      <Container className="flex-col mt-5 mb-5">
        <div className="flex gap-3 items-center justify-between">
          <div className="lg:hidden block">
            <FilterEventComponent onApplyFilters={handleApplyFilters} />
          </div>

          {searchParams.get("eventName") ? (
            <p className="text-sm md:text-lg hidden lg:block font-pally-regular">
              Search for:{"  "}
              <span className="text-gray-500 font-pally-medium text-lg  underline">
                {searchParams.get("eventName")}
              </span>
            </p>
          ) : (
            <div />
          )}

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
        <div className="px-0 md:px-6 h-full flex flex-col justify-end">
          <div className="flex gap-5 mt-6">
            <EventFilterComponent onApplyFilters={handleApplyFilters} />
            <div className="w-full h-full flex flex-col justify-between">
              <div className="h-full">
                {isGridView ? (
                  <div className="grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 justify-items-center mt-3 w-full">
                    {isLoading ? (
                      <CardSkeleton />
                    ) : (
                      <>
                        {events?.data?.length !== 0 ? (
                          events?.data?.map((card) => (
                            <CardComponent key={card._id} card={card} />
                          ))
                        ) : (
                          <div className="w-full flex flex-col items-center justify-center gap-3">
                            <p className="font-pally-regular">
                              No event uploaded
                            </p>
                            <Button
                              onClick={handleRefresh}
                              variant="destructive"
                            >
                              Refresh
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full flex-col gap-6 pb-8 mt-3">
                    {isLoading ? (
                      <CardSkeleton />
                    ) : (
                      <>
                        {events?.data?.length !== 0 ? (
                          events?.data?.map((card) => (
                            <EventListComponent key={card._id} card={card} />
                          ))
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <p className="font-pally-regular">
                              No event uploaded
                            </p>
                            <Button
                              onClick={handleRefresh}
                              variant="destructive"
                            >
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
          {events?.data.length > 0 && (
            <div className="flex justify-end gap-10 items-center whitespace-nowrap w-full overflow-x-auto pb-4 mt-6">
              <p className="text-sm text-gray-600">
                Page {events?.pagination?.currentPage} of{" "}
                {events?.pagination?.totalPages}
              </p>
              <div className="flex space-x-2">
                <Button
                  disabled={events?.pagination?.currentPage <= 1}
                  onClick={decrementPage}
                  variant="outline"
                  size="icon"
                >
                  {"<"}
                </Button>

                <Button
                  disabled={
                    events?.pagination?.currentPage ===
                    events?.pagination?.totalPages
                  }
                  onClick={incrementPage}
                  variant="outline"
                  size="icon"
                >
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
