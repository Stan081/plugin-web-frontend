import Layout from "@/components/layout";
import Faq from "@/components/faq";
import TailoredEvent from "@/components/tailoredEvent";

export default function Home() {
  return (
    <Layout title="Home" showFooter>
      <TailoredEvent/>
      <Faq/>

    </Layout>
  );
}
