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
import React, { lazy, Suspense, useMemo } from "react";

const CheckoutSummary = lazy(
  () =>
    import("@/components/page-components/eventpage/checkout/CheckoutSummary")
);

const CheckoutEvent = () => {
  const param = useParams<{ id: string }>();
  const {
    data: events,
    isLoading,
    isError,
  } = useGetEventById(param?.id as string);
  const checkCardId = events?.data;

  // Ensure all hooks are called unconditionally
  const breadcrumbArr = useMemo(() => {
    if (!checkCardId) return [];
    return checkoutBreadcrumbArr(checkCardId?.eventName, checkCardId?._id);
  }, [checkCardId]);

  // Early returns must come after all hooks are called
<<<<<<< HEAD
  if (!checkCardId || isError) {
=======
  if (isLoading || isError || !checkCardId || !isMounted) {
>>>>>>> a5c8d765612fb1bb54e089bea66d306ee9ea48da
    return <SpinnerOverlay />;
  }

  if (!param?.id) {
    return <div>Error: Event ID is missing</div>;
  }

  return (
<<<<<<< HEAD
    <Layout title="Ticket Checkout" showHeader showFooter>
      <Section id="Checkout ticket">
=======
    <Layout title={`Checkout`} showHeader showFooter>
      <Section id="checkout-page" style={{
          overflowX: "hidden",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch", // Smooth scrolling for iOS
        }}>
>>>>>>> a5c8d765612fb1bb54e089bea66d306ee9ea48da
        <Container>
          <BreadcrumbComponent
            breadcrumbArr={breadcrumbArr}
            pageName={"Checkout"}
          />

          <div className="my-6 md:my-8 flex flex-col-reverse md:flex-row justify-between gap-6 md:gap-10 w-full"  style={{
              position: "relative",
              zIndex: 1, // Ensure no stacking context issues
            }}>
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
