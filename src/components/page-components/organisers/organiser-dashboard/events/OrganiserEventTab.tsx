import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import React from "react";

const OrganiserEventTab = () => {
  const { eventState } = useOrganiserDashContext();

  return (
    <div
      id={`panel-${eventState}`}
      role="tabpanel"
      aria-labelledby={`tab-${eventState}`}
      className="mt-6 md:mt-10"
    >
      {eventState === "upcoming" && <div>rrgg</div>}
      {eventState === "draft" && <div>ggdd</div>}
      {eventState === "past_event" && <div>d</div>}
    </div>
  );
};

export default OrganiserEventTab;
