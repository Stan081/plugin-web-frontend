"use client";

import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import Layout from "@/components/layout";
import { breadcrumbArr } from "@/static-datas/breadcrumb-data";
import { cardData } from "@/static-datas/cards-data";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Seaction";
import { notFound, useParams } from "next/navigation";
import React from "react";

const TicketDetailPage = () => {
  const param = useParams<{ id: string }>();
  const checkCardId = cardData.find((card) => card?.id === param?.id);
  //   Temporary routing
  if (!checkCardId) {
    return notFound();
  }

  return (
    <Layout title="Ticket detail page" showHeader showFooter>
      <Section id="ticket-detail-page">
        <Container>
          <BreadcrumbComponent
            breadcrumbArr={breadcrumbArr}
            pageName={checkCardId?.title}
          />

          <div className="mt-7 flex flex-col md:flex-row gap-8 md:gap-10 w-full">
            <div className="w-full max-w-md">
                
            </div>
            <div>div2</div>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default TicketDetailPage;
