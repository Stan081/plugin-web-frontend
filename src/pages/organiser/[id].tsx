"use client";
import Layout from "@/components/layout";
import OrganiserEvents from "@/components/page-components/organisers/OrganiserEvents";
import OrganiserInfo from "@/components/page-components/organisers/OrganiserInfo";
import { useAllOrganisers } from "@/hooks/organiser/userAllOrganiser";
import { organiserData } from "@/static-datas/organiser-date";
import Container from "@/tw-components/container";
import { Section } from "@/tw-components/Section";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import React from "react";

const OrganiserDetailPage = () => {
  const { data: organisers, isLoading } = useAllOrganisers();
  const params = useParams();
  const organiser = organisers?.data?.find(
    (orgs) => String(orgs?.userId) === params?.id
  );
  //   Temporary routing
  if (!organiser) {
    return <h4>Not Found!!</h4>;
  }

  if (isLoading) {
    <SpinnerOverlay />;
  }
  return (
    <Layout title={`${organiser?.name}`} showHeader showFooter>
      <Section id="Organiser-detail-page" clean className="">
        <div className="h-28 md:h-[257px]">
          <Image
            src={
              organiser?.banner
            }
            alt={organiser?.name}
            width={1226}
            height={609}
            className=" pointer-events-none w-full h-full object-cover object-top"
          />
        </div>
        <Container>
          <div className="flex flex-col lg:flex-row justify-between gap-7 md:gap-10 my-5 overflow-hidden">
            <OrganiserInfo
              organiser={organiser}
            />

            <OrganiserEvents />
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default OrganiserDetailPage;
