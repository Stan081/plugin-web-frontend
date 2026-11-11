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
import type { GetStaticProps } from "next";
import { fetchSiteContent, SiteContentResponse } from "@/lib/siteContent";

type HomeProps = { siteContent: SiteContentResponse };

/**
 * Render the homepage with the admin-managed site content already in the HTML,
 * so the banner image starts downloading with the page instead of after the
 * JavaScript loads and calls the API. Re-generated at most once a minute, so
 * admin edits show within about a minute. If the API can't be reached, the
 * page still renders and the content is fetched in the browser instead.
 */
export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: { siteContent: await fetchSiteContent() },
  revalidate: 60,
});

export default function Home({ siteContent }: HomeProps) {
  const [filters] = useState({
    eventName: "",
  });
  const { data: events } = useFilteredEvents(filters);
  return (
    <Layout title="Welcome to Plugin" showFooter>
      <HeroSection initialSiteContent={siteContent} />
      <TailoredEvent />
      {events?.data?.length !== 0 && <PopularEvent />}
      <ListEvent />
      <OurCustomers />
      <Faq />
    </Layout>
  );
}
