"use client"
import React from "react";
import Faq from "@/components/faq";
import Layout from "@/components/layout";
import DashboardManagement from "@/components/page-components/features/DashboardManagement";
import EarningsManagement from "@/components/page-components/features/EarningsManagement";
import ElevateEvents from "@/components/page-components/features/ElevateEvents";
import HeroSection from "@/components/page-components/features/HeroSection";
import DashboardFeatures from "@/components/page-components/features/DashboardFeatures";

const FeaturesPage = () => {
  return (
    // All styling done, were desktop first styling
    <Layout title="Features Page" showHeader showFooter>
      <HeroSection />
      <DashboardFeatures />
      <DashboardManagement />
      <EarningsManagement />
      <ElevateEvents />
      <Faq />
    </Layout>
  );
};

export default FeaturesPage;
