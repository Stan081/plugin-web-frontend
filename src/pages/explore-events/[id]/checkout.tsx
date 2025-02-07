"use client";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import Layout from "@/components/layout";
import CheckoutContactInfo from "@/components/page-components/eventpage/checkout/CheckoutContactInfo";
import CheckoutSummary from "@/components/page-components/eventpage/checkout/CheckoutSummary";
import { useFilteredEvents } from "@/hooks/events/useFilterEvents";
import { useGetAllEvents } from "@/hooks/events/useGetAllEvents";
import { checkoutBreadcrumbArr } from "@/static-datas/breadcrumb-data";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const CheckoutEvent = () => {
  const [filters] = useState({
    eventName: "",
  });
  const { data: events, isLoading, isError } = useFilteredEvents(filters);
  const param = useParams<{ id: string }>();
  const checkCardId = events?.data.find((card) => card?._id === param?.id);

  if (!checkCardId || isError) {
    return (
      <Layout title="Page not found" showFooter showHeader>
        <p className="font-medium text-lg text-center my-5">
          {isError ? "An error occured" : "Page not found"}
        </p>
      </Layout>
    );
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
            <CheckoutContactInfo eventId={checkCardId?._id} />
            <CheckoutSummary event={checkCardId} />
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default CheckoutEvent;
