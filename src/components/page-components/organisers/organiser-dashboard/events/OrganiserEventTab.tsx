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
import { eventPhase } from "@/lib/eventDays";

const OrganiserEventTab = () => {
  const { eventState, showDeleteEvent, handleShowDeleteEvent } =
    useOrganiserDashContext();

  // const { data: User } = useMe();
  const {
    data: organiserEvents,
    isLoading,
    isError,
  } = useGetEventsByOrganiser();

  const eventList = organiserEvents?.data || [];

  // Live events (today is an event day, Lagos time) stay under Upcoming, first,
  // instead of disappearing until they are over.
  const upcomingEvents = eventList
    .filter((item) => {
      const phase = eventPhase(item);
      return item.isPublished && (phase === "live" || phase === "upcoming");
    })
    .sort((a, b) => (eventPhase(a) === "live" ? -1 : 0) - (eventPhase(b) === "live" ? -1 : 0));

  const pastEvents = eventList.filter(
    (item) => item?.isPublished && eventPhase(item) === "past"
  );

  const draftEvents = eventList.filter((item) => {
    if (item.isPublished === false) {
      return item;
    }
  });

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
