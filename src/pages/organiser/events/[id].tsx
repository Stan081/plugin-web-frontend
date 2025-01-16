import DelectEvent from "@/components/page-components/organisers/organiser-dashboard/events/DelectEvent";
import EventDetailDashboard from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/event-dashboard/EventDetailDashboard";
import EventDetailSidebar from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/EventDetailSidebar";
import EventDetailTickets from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/ticket-history/EventDetailTickets";
import EventDetailManagement from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/menage-attendees/EventDetailManagement";
import { useGetOrganiserEvents } from "@/hooks/organiser/userGetOrganiserEvents";
import { useMe } from "@/pages/api/query/me";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import EventDiscount from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/event-discount";
import EventPromotions from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/event-promotion";
import EventTicketAgents from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/event-ticket-agents";
import EventResolveIssues from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/event-resolve-issues";

const OrganiserEventDetail = () => {
  const { data: user } = useMe();
  const {
    data: organiserEvents,
    isLoading,
    isError,
  } = useGetOrganiserEvents(user?.data?._id);
  const {
    activeEvent,
    showDeleteEvent,
    handleShowDeleteEvent,
  } = useOrganiserDashContext();
  const router = useRouter();
  const params = useParams();
  const getEventDetail = organiserEvents?.data?.data.find(
    (card) => String(card?._id) === params?.id
  );
  //   Temporary routing
  if (!getEventDetail) {
    return <h4>Not Found!!</h4>;
  }

  if (isError) {
    return <p>An error occurred when fetching events</p>;
  }

  if (isLoading) {
    return <SpinnerOverlay />;
  }
  return (
    <Section id="organser-event-detail">
      <Container className="py-9">
        <p
          onClick={() => router.back()}
          className="flex cursor-pointer items-center gap-2 font-pally-medium text-lg"
        >
          <span>
            <RiArrowLeftSLine size={20} />
          </span>
          Back
        </p>

        <div className="mt-4 flex gap-7">
          <EventDetailSidebar event={getEventDetail} />
          <div className="w-full">
            {activeEvent === "dashboard" && <EventDetailDashboard />}
            {activeEvent === "attendees" && <EventDetailManagement />}
            {activeEvent === "tickets" && <EventDetailTickets />}
            {activeEvent === "discount" && <EventDiscount />}
            {activeEvent === "promotions" && <EventPromotions />}
            {activeEvent === "ticket_agent" && <EventTicketAgents />}
            {activeEvent === "resolve_issues" && <EventResolveIssues />}
          </div>
        </div>


        {showDeleteEvent && (
          <DelectEvent open={showDeleteEvent} close={handleShowDeleteEvent} />
        )}
      </Container>
    </Section>
  );
};

export default OrganiserEventDetail;
