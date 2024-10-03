"use client";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import Layout from "@/components/layout";
import CheckoutContactInfo from "@/components/page-components/eventpage/checkout/CheckoutContactInfo";
import CheckoutSummary from "@/components/page-components/eventpage/checkout/CheckoutSummary";
import { checkoutBreadcrumbArr } from "@/static-datas/breadcrumb-data";
import { cardData } from "@/static-datas/cards-data";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { notFound, useParams } from "next/navigation";
import React from "react";

const CheckoutEvent = () => {
  const param = useParams<{ id: string }>();
  const checkCardId = cardData.find((card) => card?.id === param?.id);
  //   Temporary routing
  if (!checkCardId) {
    return <p>Page not found</p>;
  }

  const breadcrumbTitle = checkCardId?.title;
  const breadcrumbArr = checkoutBreadcrumbArr(breadcrumbTitle);
  return (
    <Layout title={`Checkout`} showHeader showFooter>
      <Section id="checkout-page">
        <Container>
          <BreadcrumbComponent
            breadcrumbArr={breadcrumbArr}
            pageName={"Checkout"}
          />

          <div className="mt-6 md:mt-8 flex flex-col-reverse md:flex-row justify-between gap-6 md:gap-10 w-full">
            <CheckoutContactInfo />
            <CheckoutSummary />
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default CheckoutEvent;
