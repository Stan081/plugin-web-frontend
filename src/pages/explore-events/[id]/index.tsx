"use client";

import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import Layout from "@/components/layout";
import AboutEventDetail from "@/components/page-components/eventpage/AboutEventDetail";
import AvailableTicket from "@/components/page-components/eventpage/AvailableTicket";
import EventDetailaHeader from "@/components/page-components/eventpage/EventDetailaHeader";
import SimilarEvents from "@/components/page-components/eventpage/SimilarEvents";
import { exlporeEventsbreadcrumbArr } from "@/static-datas/breadcrumb-data";
import { cardData } from "@/static-datas/cards-data";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { useParams } from "next/navigation";
import TicketCTA from "@/components/page-components/eventpage/TicketCTA";
import React from "react";


const ExploreEventDetailPage = () => {
  const param = useParams<{ id: string }>();
  const checkCardId = cardData.find((card) => card?.id === param?.id);
  //   Temporary routing
  if (!checkCardId) {
    return <p>Page not found</p>;
  }
  return (
    <Layout title="event detail page" showHeader showFooter>
      <Section id="event-detail-page" className="relative">
        <Container className="relative">
          <BreadcrumbComponent
            breadcrumbArr={exlporeEventsbreadcrumbArr}
            pageName={checkCardId?.title}
          />

          <EventDetailaHeader title={checkCardId.title} image="" />

          <div className="flex flex-col md:flex-row gap-5 md:gap-16 relative">
            <div className="w-full lg:w-1/2">
              <AboutEventDetail />
            </div>
            <AvailableTicket id={checkCardId.id} />
          </div>

          <SimilarEvents />
        </Container>
        <TicketCTA price={checkCardId.priceRange} id={checkCardId.id} />

      </Section>
    </Layout>
  );
};

export default ExploreEventDetailPage;

export const PreviewEventPage: FC<PreviewEventPageProp> = ({ propId }) => {
  const param = useParams<{ id: string }>();
  const idToCheck = param?.id ?? propId;
  const checkCardId = cardData.find((card) => card?.id === idToCheck);
  return (
    <Section id="event-detail-page" className="relative">
      <Container className="relative">
        <BreadcrumbComponent
          breadcrumbArr={exlporeEventsbreadcrumbArr}
          pageName={checkCardId?.title}
        />

        <EventDetailaHeader title={checkCardId.title} image="" />

        <div className="flex flex-col md:flex-row gap-5 md:gap-16 relative">
          <div className="w-full lg:w-1/2">
            <AboutEventDetail />
          </div>
          <AvailableTicket id={checkCardId.id} />
        </div>
      </Container>
      <div className="lg:hidden">
        <TicketCTA price={checkCardId.priceRange} id={checkCardId.id} />
      </div>
    </Section>
  );
};

export const PreviewEventMobile: FC<PreviewEventPageProp> = ({ propId }) => {
  const param = useParams<{ id: string }>();
  const idToCheck = param?.id ?? propId;
  const checkCardId = cardData.find((card) => card?.id === idToCheck);
  return (
    <Section id="event-detail-page" className="relative">
      <Container className="relative">
        <BreadcrumbComponent
          breadcrumbArr={exlporeEventsbreadcrumbArr}
          pageName={checkCardId?.title}
        />

        <EventDetailaHeader title={checkCardId.title} image="" />

        <div className="flex flex-col md:flex-row gap-5 md:gap-16 relative">
          <div className="w-full">
            <AboutEventDetail />
          </div>
        </div>
      </Container>
      {/* <div className="max-w-sm mx-auto w-full">
        <TicketCTA price={checkCardId.priceRange} id={checkCardId.id} />
      </div> */}
    </Section>
  );
};
