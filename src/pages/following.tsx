import Layout from "@/components/layout";
import { Separator } from "@/components/ui/separator";
import { Section } from "@/tw-components/Seaction";
import React from "react";

const FollowingPage = () => {
  return (
    <Layout title="dyname text" showHeader showFooter showSidebar>
      <Section
        id="user-account-settings"
        className="md:px-10 overflow-y-auto w-full lg:max-w-7xl h-[80vh]"
      >
        <h2 className="font-pally-medium text-2xl mb-4">Following</h2>
        <Separator />
      </Section>
    </Layout>
  );
};

export default FollowingPage;
