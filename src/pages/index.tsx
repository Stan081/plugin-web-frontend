"use client";
import React, { useState } from "react";
import Faq from "@/components/faq";
import TailoredEvent from "@/components/page-components/homepage/tailoredEvent";
import ListEvent from "@/components/page-components/homepage/listEvent";
import HeroSection from "@/components/page-components/homepage/heroSection";
import PopularEvent from "@/components/page-components/homepage/popularEvent";
import OurCustomers from "@/components/OurCustomers";
import Layout from "@/components/layout";
import { useFilteredEvents } from "@/hooks/events/useFilterEvents";

export default function Home() {
  const [filters] = useState({
    eventName: "",
  });
  const { data: events } = useFilteredEvents(filters);
  return (
    <Layout title="Welcome to Plugin" showFooter>
      <HeroSection />
      <TailoredEvent />
      {events?.data?.length !== 0 && <PopularEvent />}
      <ListEvent />
      <OurCustomers />
      <Faq />
    </Layout>
  );
}
