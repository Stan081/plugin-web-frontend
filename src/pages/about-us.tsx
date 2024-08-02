import Footer from "@/components/Footer";
import PublicHeader from "@/components/Header";
import AboutHero from "@/components/page-components/aboutpage/AboutHero";
import WhoWeAre from "@/components/page-components/aboutpage/WhoWeAre";
import React, { Fragment } from "react";

const AboutUs = () => {
  return (
    <Fragment>
      <PublicHeader/>
      <AboutHero />
      <WhoWeAre/>
      <Footer/>
    </Fragment>
  );
};

export default AboutUs;
