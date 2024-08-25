"use client";
import Layout from "@/components/layout";
import { organiserData } from "@/static-datas/organiser-date";
import { notFound, useParams } from "next/navigation";
import React from "react";

const OrganiserDetailPage = () => {
  const params = useParams();
  const getOrganiser = organiserData.find(
    (card) => String(card?.id) === params?.id
  );
  //   Temporary routing
  if (!getOrganiser) {
    return notFound();
  }
  return (
    <Layout title={`${getOrganiser.organiser_name}`} showHeader showFooter>
      hello
    </Layout>
  );
};

export default OrganiserDetailPage;
