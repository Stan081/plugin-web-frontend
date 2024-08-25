"use client";
import Layout from "@/components/layout";
import OrganiserEvents from "@/components/page-components/organisers/OrganiserEvents";
import OrganiserInfo from "@/components/page-components/organisers/OrganiserInfo";
import { organiserData } from "@/static-datas/organiser-date";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import React from "react";

const OrganiserDetailPage = () => {
  const params = useParams();
  const getOrganiser = organiserData.find(
    (card) => String(card?.id) === params?.id
  );
  //   Temporary routing
  if (!getOrganiser) {
    return <h4>Not Found!!</h4>;
  }
  return (
    <Layout title={`${getOrganiser.organiser_name}`} showHeader showFooter>
      <Section id="Organiser-detail-page" clean className="">
        <div className="h-28 md:h-[257px]">
          <Image
            src={
              "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image1.png?updatedAt=1722389173816"
            }
            alt="About-us"
            width={1226}
            height={609}
            className=" pointer-events-none w-full h-full object-cover"
          />
        </div>
        <Container>
          <div className="flex flex-col lg:flex-row justify-between gap-7 md:gap-10 my-5 overflow-hidden">
            <OrganiserInfo
              organiserName={getOrganiser?.organiser_name}
              aboutOrganiser={getOrganiser?.about_organiser}
            />

            <OrganiserEvents />
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default OrganiserDetailPage;
