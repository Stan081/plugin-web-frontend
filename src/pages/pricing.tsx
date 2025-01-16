"use client"
import Faq from "@/components/faq";
import Layout from "@/components/layout";
import AdPackages from "@/components/page-components/pricingpage/AdPackages";
import ExploreTools from "@/components/page-components/pricingpage/ExploreTools";
import SalesProgress from "@/components/page-components/pricingpage/SalesProgress";
import TicketingFees from "@/components/page-components/pricingpage/TicketingFees";
import TicketManagement from "@/components/page-components/pricingpage/TicketManagement";
import React from "react";

const Pricing = () => {
  return (
    <Layout title="Plugin | Pricing Page" showHeader showFooter>
      <ExploreTools />
      <TicketingFees />
      <TicketManagement />
      <SalesProgress />
      <AdPackages />
      <Faq />
    </Layout>
  );
};

export default Pricing;
