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
import { useGetAllEvents } from "@/hooks/events/useGetAllEvents";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { getCookie, removeCookie } from "@/lib/cookies";
import TicketCTA from "@/components/page-components/eventpage/TicketCTA";

const ExploreEventDetailPage = () => {
  const { data: events, isLoading } = useGetAllEvents();
  const param = useParams<{ id: string }>();
  const cardId = events?.data.find((card) => card?._id === param?.id);

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
              title={cardId.eventName}
              image={cardId?.eventBanner}
              id={cardId?._id}
            />

            <div className="flex flex-col md:flex-row gap-5 md:gap-16 relative">
              <div className="w-full md:w-4/6">
                <AboutEventDetail event={cardId} />
              </div>
              <AvailableTicket event={cardId} id={cardId._id} />
            </div>

            <SimilarEvents />
          </Container>
          <TicketCTA event={cardId} id={cardId._id} />
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

//         <EventDetailsHeader title={cardId.title} image="" />

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

//         <EventDetailsHeader title={cardId.title} image="" />

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
