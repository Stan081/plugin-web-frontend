"use client";

import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import Layout from "@/components/layout";
import AboutEventDetail from "@/components/page-components/eventpage/AboutEventDetail";
import AvailableTicket from "@/components/page-components/eventpage/AvailableTicket";
import EventDetailaHeader from "@/components/page-components/eventpage/EventDetailaHeader";
import EventsTags from "@/components/page-components/eventpage/EventsTags";
import SimilarEvents from "@/components/page-components/eventpage/SimilarEvents";
import { exlporeEventsbreadcrumbArr } from "@/static-datas/breadcrumb-data";
import { cardData } from "@/static-datas/cards-data";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { notFound, useParams } from "next/navigation";
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
      <Section id="event-detail-page">
        <Container>
          <BreadcrumbComponent
            breadcrumbArr={exlporeEventsbreadcrumbArr}
            pageName={checkCardId?.title}
          />

          <EventDetailaHeader title={checkCardId.title} image="" />

          <div className="flex flex-col md:flex-row gap-5 md:gap-16 relative">
            <AboutEventDetail />
            <AvailableTicket />
          </div>

          <SimilarEvents/>

        </Container>
      </Section>
    </Layout>
  );
};

export default ExploreEventDetailPage;
