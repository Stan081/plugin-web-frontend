"use client";

import React from "react"
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import Layout from "@/components/layout";
import AboutEventDetail from "@/components/page-components/eventpage/AboutEventDetail";
import AvailableTicket from "@/components/page-components/eventpage/AvailableTicket";
import EventDetailaHeader from "@/components/page-components/eventpage/EventDetailaHeader";
import SimilarEvents from "@/components/page-components/eventpage/SimilarEvents";
import { exlporeEventsbreadcrumbArr } from "@/static-datas/breadcrumb-data";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { useParams } from "next/navigation";
import TicketCTA from "@/components/page-components/eventpage/TicketCTA";
import React, { FC } from "react";
import { useGetAllEvents } from "@/hooks/events/useGetAllEvents";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";

const ExploreEventDetailPage = () => {
  const { data: events, isLoading } = useGetAllEvents();
  const param = useParams<{ id: string }>();
  const cardId = events?.data.find((card) => card?._id === param?.id);
  //   Temporary routing
  if (!cardId) {
    return <SpinnerOverlay />;
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

            <EventDetailaHeader
              title={cardId.eventName}
              image={cardId?.eventBanner}
            />

            <div className="flex flex-col md:flex-row gap-5 md:gap-16 relative">
              <div className="w-full lg:w-1/2">
                <AboutEventDetail event={cardId} />
              </div>
              <AvailableTicket event={cardId} id={cardId._id} />
            </div>

            <SimilarEvents />
          </Container>
          {/* <TicketCTA price={cardId.priceRange} id={cardId.id} /> */}
        </Section>
      )}
    </Layout>
  );
};

export default ExploreEventDetailPage;

// export const PreviewEventPage: FC<PreviewEventPageProp> = ({ propId }) => {
//   const param = useParams<{ id: string }>();
//   const idToCheck = param?.id ?? propId;
//   const cardId = cardData.find((card) => card?.id === idToCheck);
//   return (
//     <Section id="event-detail-page" className="relative">
//       <Container className="relative">
//         <BreadcrumbComponent
//           breadcrumbArr={exlporeEventsbreadcrumbArr}
//           pageName={cardId?.title}
//         />

//         <EventDetailaHeader title={cardId.title} image="" />

//         <div className="flex flex-col md:flex-row gap-5 md:gap-16 relative">
//           <div className="w-full lg:w-1/2">
//             <AboutEventDetail />
//           </div>
//           <AvailableTicket id={cardId.id} />
//         </div>
//       </Container>
//       <div className="lg:hidden">
//         <TicketCTA price={cardId.priceRange} id={cardId.id} />
//       </div>
//     </Section>
//   );
// };

// export const PreviewEventMobile: FC<PreviewEventPageProp> = ({ propId }) => {
//   const param = useParams<{ id: string }>();
//   const idToCheck = param?.id ?? propId;
//   const cardId = cardData.find((card) => card?.id === idToCheck);
//   return (
//     <Section id="event-detail-page" className="relative">
//       <Container className="relative">
//         <BreadcrumbComponent
//           breadcrumbArr={exlporeEventsbreadcrumbArr}
//           pageName={cardId?.title}
//         />

//         <EventDetailaHeader title={cardId.title} image="" />

//         <div className="flex flex-col md:flex-row gap-5 md:gap-16 relative">
//           <div className="w-full">
//             <AboutEventDetail />
//           </div>
//         </div>
//       </Container>
//       {/* <div className="max-w-sm mx-auto w-full">
//         <TicketCTA price={cardId.priceRange} id={cardId.id} />
//       </div> */}
//     </Section>
//   );
// };
