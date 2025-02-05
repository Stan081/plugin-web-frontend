"use client";

import React, { useEffect } from "react";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import Layout from "@/components/layout";
import AboutEventDetail from "@/components/page-components/eventpage/AboutEventDetail";
import AvailableTicket from "@/components/page-components/eventpage/AvailableTicket";
import EventDetailsHeader from "@/components/page-components/eventpage/EventDetailsHeader";
import SimilarEvents from "@/components/page-components/eventpage/SimilarEvents";
import { exlporeEventsbreadcrumbArr } from "@/static-datas/breadcrumb-data";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { useParams } from "next/navigation";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { getCookie, removeCookie } from "@/lib/cookies";
import TicketCTA from "@/components/page-components/eventpage/TicketCTA";
import { useGetEventById } from "@/hooks/events/useGetEventById";

const ExploreEventDetailPage = () => {
  const param = useParams<{ id: string }>();
  const { data: events, isLoading } = useGetEventById(param?.id);
  const cardId = events?.data;

  useEffect(() => {
    if (getCookie("tickets") || getCookie("entryTicket"))
      removeCookie("tickets");
    removeCookie("entryTicket");
  }, [getCookie, removeCookie]);

  if (isLoading) {
    return <SpinnerOverlay />;
  }

  if (!cardId) {
    return <p>Event not found</p>;
  }
  return (
    <Layout title={cardId?.eventName} showHeader showFooter>
      {isLoading ? (
        <SpinnerOverlay />
      ) : (
        <Section id="event-detail-page" className="relative">
          <Container className="relative">
            <BreadcrumbComponent
              breadcrumbArr={exlporeEventsbreadcrumbArr}
              pageName={cardId?.eventName}
            />

            <EventDetailsHeader
              title={cardId?.eventName}
              image={cardId?.eventBanner}
              id={cardId?._id}
            />

            <div className="flex flex-col md:flex-row gap-5 md:gap-16 relative">
              <div className="w-full md:w-4/6">
                <AboutEventDetail event={cardId} />
              </div>
              <AvailableTicket event={cardId} id={cardId?._id} />
            </div>

            <SimilarEvents />
          </Container>
          <TicketCTA event={cardId} id={cardId?._id} />
        </Section>
      )}
    </Layout>
  );
};

export default ExploreEventDetailPage;



