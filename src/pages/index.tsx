import Layout from "@/components/layout";
import Faq from "@/components/page-components/homepage/faq";
import TailoredEvent from "@/components/page-components/homepage/tailoredEvent";
import ListEvent from "@/components/page-components/homepage/listEvent";
import TestUI from "@/components/test";
import Card from "@/components/CardComponent";

export default function Home() {
  return (
    <Layout title="Home" showFooter>
      <TailoredEvent />
      {/* <TestUI /> */}
      <ListEvent/>
      <Faq />
    </Layout>
  );
}
