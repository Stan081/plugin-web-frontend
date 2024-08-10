import Layout from "@/components/layout";
import FollowersComponent from "@/components/page-components/user-dashboard/followers";
import SearchComponent from "@/components/page-components/user-dashboard/SearchComponent";
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

        <div className="flex items-center justify-between mt-4">
          <p className="text-[#AFB2B9] font-pally-regular text-sm md:text-base">
            10 followers
          </p>
          <SearchComponent placeholder="Search for followers" />
        </div>

        <FollowersComponent/>
      </Section>
    </Layout>
  );
};

export default FollowingPage;
