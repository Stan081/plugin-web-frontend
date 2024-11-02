"use client";
import Faq from "@/components/faq";
import TailoredEvent from "@/components/page-components/homepage/tailoredEvent";
import ListEvent from "@/components/page-components/homepage/listEvent";
import TestUI from "@/components/test";
import HeroSection from "@/components/page-components/homepage/heroSection";
import PopularEvent from "@/components/page-components/homepage/popularEvent";
import TopLocation from "@/components/page-components/homepage/topLocations";
import OurCustomers from "@/components/OurCustomers";
import Layout from "@/components/layout";
import { useMe } from "./api/query/me";

export default function Home() {
  const { data: userData } = useMe();
  console.log(userData?.data)
  return (
    <Layout title="Welcome to Plugin" showHeader showFooter>
      <HeroSection />
      <TailoredEvent />
      <PopularEvent />
      {/* <TopLocation/> */}
      {/* <TestUI /> */}
      <ListEvent />
      <OurCustomers />
      <Faq />
    </Layout>
  );
}
