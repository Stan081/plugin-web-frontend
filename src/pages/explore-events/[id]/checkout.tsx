"use client";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import Layout from "@/components/layout";
import CheckoutContactInfo from "@/components/page-components/eventpage/checkout/CheckoutContactInfo";
import CheckoutSummary from "@/components/page-components/eventpage/checkout/CheckoutSummary";
import { useGetAllEvents } from "@/hooks/events/useGetAllEvents";
import { checkoutBreadcrumbArr } from "@/static-datas/breadcrumb-data";
import { cardData } from "@/static-datas/cards-data";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import {  useParams } from "next/navigation";
import React from "react";

const CheckoutEvent = () => {
  const { data: events, isLoading } = useGetAllEvents();
  const param = useParams<{ id: string }>();
  const checkCardId = events?.data.find((card) => card?._id === param?.id);

  console.log(checkCardId);
  //   Temporary routing
  if (!checkCardId) {
    return <p>Page not found</p>;
  }

  if (isLoading) return <SpinnerOverlay />;

  const breadcrumbArr = checkoutBreadcrumbArr(
    checkCardId?.eventName,
    checkCardId?._id
  );
  return (
    <Layout title={`Checkout`} showHeader showFooter>
      <Section id="checkout-page">
        <Container>
          <BreadcrumbComponent
            breadcrumbArr={breadcrumbArr}
            pageName={"Checkout"}
          />

          <div className="my-6 md:my-8 flex flex-col-reverse md:flex-row justify-between gap-6 md:gap-10 w-full">
            <CheckoutContactInfo />
            <CheckoutSummary event={checkCardId}/>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default CheckoutEvent;
