import GoBack from "@/components/GoBack";
import Layout from "@/components/layout";
import FollowersComponent from "@/components/page-components/user-dashboard/followers";
import SearchComponent from "@/components/page-components/user-dashboard/SearchComponent";
import { Separator } from "@/components/ui/separator";
import { followersData, followersDataProps } from "@/static-datas/followers";
import { Section } from "@/tw-components/Section";
import React, { useState } from "react";

const FollowingPage = () => {
  const [getFollowers, setGetFollowers] =
    useState<followersDataProps[]>(followersData);

  const handleUnfollow = (id: string) => {
    const filteredFollower = getFollowers.filter((fol) => fol.id !== id);
    console.log(filteredFollower);
    setGetFollowers(filteredFollower);
  };

  return (
    <Layout title="dyname text" showHeader showFooter showSidebar>
      <Section
        id="user-account-settings"
        className="md:px-10 overflow-y-auto w-full lg:max-w-7xl h-[80vh]"
      >
        <div className="flex gap-3">
          <GoBack />
          <h2 className="font-pally-medium text-2xl mb-4">Following</h2>
        </div>
        <Separator />

        <div className="flex items-center justify-between gap-4 mt-4 ease-out delay-75 duration-75">
          <p className="text-[#AFB2B9] font-pally-regular text-sm md:text-base whitespace-nowrap">
            {getFollowers.length} followers
          </p>
          <SearchComponent placeholder="Search for followers" />
        </div>

        <FollowersComponent
          getFollowers={getFollowers}
          handleUnfollow={handleUnfollow}
        />
      </Section>
    </Layout>
  );
};

export default FollowingPage;
