import Faq from "@/components/page-components/homepage/faq";
import TailoredEvent from "@/components/page-components/homepage/tailoredEvent";
import ListEvent from "@/components/page-components/homepage/listEvent";
import TestUI from "@/components/test";
import HeroSection from "@/components/page-components/homepage/heroSection";
import UpcomingEvent from "@/components/page-components/homepage/upcomingEvent";
import { Fragment } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopularEvent from "@/components/page-components/homepage/popularEvent";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <HeroSection />
      <TailoredEvent />
      <PopularEvent />
      <TestUI />
      <ListEvent />
      <Faq />
      {/* <UpcomingEvent/> */}
      <Footer />
    </Fragment>
  );
}
