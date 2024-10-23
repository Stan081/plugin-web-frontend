import React from "react";
import Faq from "@/components/faq";
import Layout from "@/components/layout";
import OurCustomers from "@/components/OurCustomers";
import DashboardManagement from "@/components/page-components/features/DashboardManagement";
import EarningsManagement from "@/components/page-components/features/EarningsManagement";
import ElevateEvents from "@/components/page-components/features/ElevateEvents";
import HeroSection from "@/components/page-components/features/HeroSection";

const FeaturesPage = () => {
  return (
    // All styling done, were desktop first styling
    <Layout title="Features Page" showHeader showFooter>
      <HeroSection />
      <DashboardManagement />
      <EarningsManagement />
      <OurCustomers />
      <ElevateEvents />
      <Faq />
    </Layout>
  );
};

export default FeaturesPage;
