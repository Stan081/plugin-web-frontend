import Layout from "@/components/layout";
import Faq from "@/components/faq";
import TailoredEvent from "@/components/tailoredEvent";
import ListEvent from "@/components/page-components/homepage/listEvent";
import TestUI from "@/components/test";

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
