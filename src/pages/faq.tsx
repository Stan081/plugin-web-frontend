import Faq from "@/components/faq";
import Layout from "@/components/layout";
import React, { Fragment } from "react";

const FaqPage = () => {
  return (
    <Layout title="FAQ | Help" showHeader showFooter>
      <Faq />
    </Layout>
  );
};

export default FaqPage;
