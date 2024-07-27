import Layout from "@/components/layout";
import Container from "@/tw-components/container";

export default function Home() {
  return (
    <Layout title="Home" showFooter className={``}>
      <Container className="">
        <h1 className=" text-3xl font-regular text-[#D9302A] hover:text-[#f75852]">
          Is Plugin free to use?
        </h1>
      </Container>
    </Layout>
  );
}
