"use client";

import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import Layout from "@/components/layout";
import TicketDetail from "@/components/page-components/user-dashboard/tickets/TicketDetail";
import TicketSummary from "@/components/page-components/user-dashboard/tickets/TicketSummary";
import { ticketbreadcrumbArr } from "@/static-datas/breadcrumb-data";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { useParams } from "next/navigation";
import React from "react";
import { useRouter } from "next/router";
import { useGetEventTickets } from "@/pages/api/mutate/tickets";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";


const TicketDetailPage = () => {
  const param = useParams<{ id: string }>();

  const router = useRouter();
  const { createdAt } = router.query;
  const createdAtString = Array.isArray(createdAt) ? createdAt[0] : createdAt;
  const { data: data, isLoading } = useGetEventTickets(
    param?.id,
  );

  // const checkCardId = cardData.find((card) => card?.id === param?.id);
  //   Temporary routing
  if (!param?.id) {
    return <div>Not Found!!</div>;
  }

  return (
    <Layout title="Ticket detail page" showHeader showFooter>
      <Section id="ticket-detail-page">
        {isLoading && <SpinnerOverlay />}
        <Container>
          <BreadcrumbComponent
            breadcrumbArr={ticketbreadcrumbArr}
            pageName={data?.data?.event?.eventName}
          />

          <div className="mt-7 flex flex-col md:flex-row gap-8 md:gap-10 w-full">
            <div className="w-full lg:max-w-md">
              <TicketDetail
                event={data?.data?.event}
                tickets={data?.data?.tickets}
              />
            </div>
            <div className="w-full">
              <TicketSummary
                user={data?.data?.user}
                tickets={data?.data?.tickets}
                createdAt={createdAtString}
              />
            </div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default TicketDetailPage;
