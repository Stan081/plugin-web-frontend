"use client";
import Faq from "@/components/faq";
import TailoredEvent from "@/components/page-components/homepage/tailoredEvent";
import ListEvent from "@/components/page-components/homepage/listEvent";
import TestUI from "@/components/test";
import HeroSection from "@/components/page-components/homepage/heroSection";
import UpcomingEvent from "@/components/page-components/homepage/upcomingEvent";
import PopularEvent from "@/components/page-components/homepage/popularEvent";
import TopLocation from "@/components/page-components/homepage/topLocations";
import OurCustomers from "@/components/OurCustomers";
import Layout from "@/components/layout";
import { getToken } from "@/lib/token";

export default function Home() {
  const gen = getToken();
  return (
    <Layout title="Welcome to Plugin" showHeader showFooter>
      {/* <p>{gen}</p> */}
      <HeroSection />
      <TailoredEvent />
      <PopularEvent />
      {/* <TopLocation/> */}
      {/* <TestUI /> */}
      <ListEvent />
      <OurCustomers />
      <Faq />
      {/* <UpcomingEvent/> */}
    </Layout>
  );
}
