import DelectEvent from "@/components/page-components/organisers/organiser-dashboard/events/DelectEvent";
import EventDetailDashboard from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/event-dashboard/EventDetailDashboard";
import EventDetailSidebar from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/EventDetailSidebar";
import EventDetailTickets from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/ticket-history/EventDetailTickets";
import EventDetailManagement from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/menage-attendees/EventDetailManagement";
import PreviewEvent from "@/components/page-components/organisers/organiser-dashboard/events/PreviewEvent";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import { organiserEvents } from "@/static-datas/organiser-date";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";

const OrganiserEventDetail = () => {
  const {
    activeEvent,
    showPreviewEvent,
    showDeleteEvent,
    handlePreviewEvent,
    handleShowDeleteEvent,
  } = useOrganiserDashContext();
  const router = useRouter();
  const params = useParams();
  const getEventDetail = organiserEvents.find(
    (card) => String(card?.id) === params?.id
  );
  //   Temporary routing
  if (!getEventDetail) {
    return <h4>Not Found!!</h4>;
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
          <EventDetailSidebar {...getEventDetail} />
          <div className="w-full">
            {activeEvent === 'dashboard' && <EventDetailDashboard/>}
            {activeEvent === 'attendees' && <EventDetailManagement/>}
            {activeEvent === 'tickets' && <EventDetailTickets/>}
          </div>
        </div>

        {showPreviewEvent && (
          <PreviewEvent open={showPreviewEvent} close={handlePreviewEvent} />
        )}

        {showDeleteEvent && (
          <DelectEvent open={showDeleteEvent} close={handleShowDeleteEvent} />
        )}
      </Container>
    </Section>
  );
};

export default OrganiserEventDetail;
