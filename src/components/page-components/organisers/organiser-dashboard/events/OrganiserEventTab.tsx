"use client";

import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import React, { Fragment } from "react";
import OrganiserEventCard from "./OrganiserEventCard";
import Container from "@/tw-components/container";
import DelectEvent from "./DelectEvent";
// import { useMe } from "@/pages/api/query/me";

import CardSkeleton from "@/tw-components/skeleton/CardSkeleton";
import CardEmptyState from "../home/CardEmptyState";
import { useGetEventsByOrganiser } from "@/hooks/organiser/useGetEventsByOrganizer";

const OrganiserEventTab = () => {
  const {
    eventState,
    showDeleteEvent,
    handleShowDeleteEvent,
  } = useOrganiserDashContext();

  // const { data: User } = useMe();
  const {
    data: organiserEvents,
    isLoading,
    isError,
  } = useGetEventsByOrganiser();

  const now = new Date();

  const upcomingEvents = organiserEvents?.data?.filter((item) => {
    const startDate = new Date(
      item?.startDate
    );
    if(item.isPublished === true && startDate.getDate() >= now.getDate()){  
      return item;
    }
  });

  const pastEvents = organiserEvents?.data?.filter((item) => {
    const endDate = new Date(item?.endDate);
    if( item.isPublished === true && endDate.getDate() < now.getDate()){
      return item
    }

  });

  const draftEvents = organiserEvents?.data?.filter((item) => {
    if(item.isPublished === false){
      return item
    }
  })

  if (isError) {
    return <p>An error occurred when fetching events</p>;
  }

  return (
    <Container>
      <div
        id={`panel-${eventState}`}
        role="tabpanel"
        aria-labelledby={`tab-${eventState}`}
        className="my-6 md:my-10"
      >
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <Fragment>
            {eventState === "upcoming" && (
              <div className="flex flex-wrap gap-6">
                {upcomingEvents?.length !== 0 ? (
                  upcomingEvents?.map((item: any) => (
                    <OrganiserEventCard key={item._id} event={item} />
                  ))
                ) : (
                  <CardEmptyState
                    text="You don’t have any events , Let’s create one"
                    isShow
                  />
                )}
              </div>
            )}
            {eventState === "past_event" && (
              <div className="flex flex-wrap gap-6">
                {pastEvents?.length !== 0 ? (
                  pastEvents?.map((item: any) => (
                    <OrganiserEventCard key={item._id} event={item} />
                  ))
                ) : (
                  <CardEmptyState text="You don’t have any past events yet." />
                )}
              </div>
            )}
            {eventState === "draft" && (
              <div className="flex flex-wrap gap-6">
                {draftEvents?.length !== 0 ? (
                  draftEvents?.map((item: any) => (
                    <OrganiserEventCard key={item._id} event={item} />
                  ))
                ) : (
                  <CardEmptyState text="You don’t have any draft events yet." />
                )}
              </div>
            )}
          </Fragment>
        )}

        {showDeleteEvent && (
          <DelectEvent open={showDeleteEvent} close={handleShowDeleteEvent} />
        )}
      </div>
    </Container>
  );
};

export default OrganiserEventTab;
