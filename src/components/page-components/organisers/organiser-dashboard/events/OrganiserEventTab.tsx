"use client";

import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import React from "react";
import OrganiserEventCard from "./OrganiserEventCard";
import Container from "@/tw-components/container";
import PreviewEvent from "./PreviewEvent";
import DelectEvent from "./DelectEvent";

const OrganiserEventTab = () => {
  const {
    eventState,
    showPreviewEvent,
    showDeleteEvent,
    handlePreviewEvent,
    handleShowDeleteEvent,
  } = useOrganiserDashContext();

  return (
    <Container>
      <div
        id={`panel-${eventState}`}
        role="tabpanel"
        aria-labelledby={`tab-${eventState}`}
        className="mt-6 md:mt-10"
      >
        {/* {eventState === "upcoming" && <div>rrgg</div>}
        {eventState === "draft" && <div>ggdd</div>}
        {eventState === "past_event" && <div>d</div>} */}
        <OrganiserEventCard />
        {showPreviewEvent && (
          <PreviewEvent open={showPreviewEvent} close={handlePreviewEvent} />
        )}

        {showDeleteEvent && (
          <DelectEvent
           open={showDeleteEvent} close={handleShowDeleteEvent}
            />
        )}
      </div>
    </Container>
  );
};

export default OrganiserEventTab;
