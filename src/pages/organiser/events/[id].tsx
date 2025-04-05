"use client";
import DelectEvent from "@/components/page-components/organisers/organiser-dashboard/events/DelectEvent";
import EventDetailDashboard from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/event-dashboard/EventDetailDashboard";
import EventDetailSidebar, {
  eventDetailTabLink,
} from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/EventDetailSidebar";
import EventDetailTickets from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/booking-history/EventDetailTickets";
import EventDetailManagement from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/menage-attendees/EventDetailManagement";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiArrowLeftSLine, RiCloseLine } from "react-icons/ri";
import EventDiscount from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/event-discount";
import EventPromotions from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/event-promotion";
import EventTicketAgents from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/event-ticket-agents";
import EventResolveIssues from "@/components/page-components/organisers/organiser-dashboard/events/organiser-event-detail/event-support-center";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useEventsContext } from "@/providers/events.provider";
import { useGetOrganiserEventById } from "@/hooks/organiser/useGetOrganiserEventById";
import { TabProgress } from "@/components/page-components/organisers/organiser-dashboard/home/TabProgress";

const OrganiserEventDetail = () => {
  const { setPublishedEventId } = useEventsContext();
  const [isShown, setIsShown] = useState<boolean>(false);
  const params = useParams();
  const {
    data: organiserEvent,
    isLoading,
    isError,
  } = useGetOrganiserEventById(params?.id as string);
  const {
    activeEvent,
    showDeleteEvent,
    handleShowDeleteEvent,
    setActiveEvent,
  } = useOrganiserDashContext();
  const router = useRouter();
  const getEventDetail = organiserEvent?.data;
  setPublishedEventId(getEventDetail?._id);
  //   Temporary routing
  if (!getEventDetail) {
    return <SpinnerOverlay />;
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
        <div className="flex justify-between items-center">
          <p
            onClick={() => router.back()}
            className="flex cursor-pointer items-center gap-2 font-pally-medium text-lg"
          >
            <span>
              <RiArrowLeftSLine size={20} />
            </span>
            Back
          </p>

          <div className="lg:hidden block">
            <Drawer>
              <DrawerTrigger asChild>
                <Button size="sm" variant="destructive">
                  Event menu
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-white px-4">
                <DrawerHeader className="flex justify-between items-start p-0">
                  <DrawerTitle>Event Menu</DrawerTitle>
                  <DrawerClose asChild>
                    <div className="p-1.5 rounded-full bg-gray-200 absolute top-3 right-3">
                      <RiCloseLine size={20} />
                    </div>
                  </DrawerClose>
                </DrawerHeader>
                <div className="mt-5 h-[60vh] overflow-y-auto">
                  <ul className="mt-4 block space-y-1.5">
                    {eventDetailTabLink.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li
                          key={item.key}
                          onClick={() => {
                            setActiveEvent(item.key);
                            setIsShown(!isShown);
                          }}
                          className={`flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer rounded font-pally-regular text-sm ${
                            activeEvent === item.key &&
                            `bg-[#FFF1F0] text-[#D9302A]`
                          }`}
                        >
                          <DrawerClose className="flex items-center gap-2">
                            <Icon size={22} />
                            {item.title}
                          </DrawerClose>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="my-4 flex flex-col gap-1 border mx-4 rounded-md p-3">
                    <p className="text-[#667185] whitespace-nowrap font-pally-regular text-base">
                      Sale progress (%)
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="w-full">
                        <TabProgress
                          value={getEventDetail?.salesPercentage}
                          max={100}
                        />
                      </div>
                      <p className="text-[#667185] whitespace-nowrap font-pally-regular">
                        {getEventDetail?.salesPercentage}/{100}
                      </p>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <div className="mt-4 flex gap-7">
          <div className="hidden lg:block w-full max-w-sm">
            <EventDetailSidebar event={getEventDetail} />
          </div>
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
