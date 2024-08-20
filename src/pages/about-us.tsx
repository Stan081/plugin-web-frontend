import Layout from "@/components/layout";
import OurCustomers from "@/components/OurCustomers";
import AboutHero from "@/components/page-components/aboutpage/AboutHero";
import WhatWeOffter from "@/components/page-components/aboutpage/WhatWeOffter";
import WhoWeAre from "@/components/page-components/aboutpage/WhoWeAre";
import WhyChoose from "@/components/page-components/aboutpage/WhyChoose";

const AboutUs = () => {
  return (
    <Layout title="About us" showHeader showFooter>
      <AboutHero />
      <WhoWeAre/>
      <WhatWeOffter/>
      <WhyChoose/>
      <OurCustomers/>
    </Layout>
  );
};

export default AboutUs;
