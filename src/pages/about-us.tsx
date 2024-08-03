import Footer from "@/components/Footer";
import PublicHeader from "@/components/Header";
import AboutHero from "@/components/page-components/aboutpage/AboutHero";
import WhatWeOffter from "@/components/page-components/aboutpage/WhatWeOffter";
import WhoWeAre from "@/components/page-components/aboutpage/WhoWeAre";
import WhyChoose from "@/components/page-components/aboutpage/WhyChoose";
import React, { Fragment } from "react";

const AboutUs = () => {
  return (
    <Fragment>
      <PublicHeader/>
      <AboutHero />
      <WhoWeAre/>
      <WhatWeOffter/>
      <WhyChoose/>
      <Footer/>
    </Fragment>
  );
};

export default AboutUs;
