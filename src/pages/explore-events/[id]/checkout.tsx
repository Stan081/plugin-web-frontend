"use client";
import BreadcrumbComponent from "@/components/BreadcrumbComponent";
import Layout from "@/components/layout";
import CheckoutContactInfo from "@/components/page-components/eventpage/checkout/CheckoutContactInfo";
import { useGetEventById } from "@/hooks/events/useGetEventById";
import useRedirectOnReload from "@/hooks/useRedirectOnReload";
import { checkoutBreadcrumbArr } from "@/static-datas/breadcrumb-data";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useParams } from "next/navigation";
import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";

const CheckoutSummary = lazy(() => import("@/components/page-components/eventpage/checkout/CheckoutSummary"));

const CheckoutEvent = () => {
  const param = useParams<{ id: string }>();
  const { data: events, isLoading, isError } = useGetEventById(param?.id);
  const checkCardId = events?.data;


  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    // Set isMounted to true after the initial render
    setIsMounted(true);
  }, []);

  // Ensure all hooks are called unconditionally
  const breadcrumbArr = useMemo(() => {
    if (!checkCardId) return [];
    return checkoutBreadcrumbArr(checkCardId?.eventName, checkCardId?._id);
  }, [checkCardId]);

  // const memoizedCheckoutSummary = useMemo(() => {
  //   if (!checkCardId) return null; // Return null if data is not available
  //   return (
  //     <CheckoutSummary
  //       startDate={
  //         checkCardId?.oneTimeEvent?.startDate ||
  //         checkCardId?.recurringEvent?.startDate
  //       }
  //       startTime={
  //         checkCardId?.oneTimeEvent?.startTime ||
  //         checkCardId?.recurringEvent?.startTime
  //       }
  //       thumbnail={checkCardId?.thumbnail}
  //       eventName={checkCardId?.eventName}
  //       locationType={checkCardId?.locationType}
  //       address={checkCardId?.physicalLocation?.address}
  //     />
  //   );
  // }, [checkCardId]);

  // Early returns must come after all hooks are called
  if (!checkCardId || isError) {
    return <SpinnerOverlay />;
  }

  if (!isMounted) {
    return <SpinnerOverlay />;
  }

  if (!param?.id) {
    return <div>Error: Event ID is missing</div>;
  }

  if (isLoading) return <SpinnerOverlay />;

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
            <Suspense fallback={<SpinnerOverlay />}>
              <CheckoutSummary
                startDate={
                  checkCardId?.oneTimeEvent?.startDate ||
                  checkCardId?.recurringEvent?.startDate
                }
                startTime={
                  checkCardId?.oneTimeEvent?.startTime ||
                  checkCardId?.recurringEvent?.startTime
                }
                thumbnail={checkCardId?.thumbnail}
                eventName={checkCardId?.eventName}
                locationType={checkCardId?.locationType}
                address={checkCardId?.physicalLocation?.address}
              />
            </Suspense>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default CheckoutEvent;
