import Faq from "@/components/faq";
import TailoredEvent from "@/components/page-components/homepage/tailoredEvent";
import ListEvent from "@/components/page-components/homepage/listEvent";
import TestUI from "@/components/test";
import HeroSection from "@/components/page-components/homepage/heroSection";
import UpcomingEvent from "@/components/page-components/homepage/upcomingEvent";
import { Fragment } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopularEvent from "@/components/page-components/homepage/popularEvent";
import TopLocation from "@/components/page-components/homepage/topLocations";
import OurCustomers from "@/components/OurCustomers";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <HeroSection />
      <TailoredEvent />
      <PopularEvent />
      <TopLocation/>
      {/* <TestUI /> */}
      <ListEvent />
      <OurCustomers/>
      <Faq />
      {/* <UpcomingEvent/> */}
      <Footer />
    </Fragment>
  );
}
