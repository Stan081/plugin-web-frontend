"use client";
import GoBack from "@/components/GoBack";
import Layout from "@/components/layout";
import FollowersComponent from "@/components/page-components/user-dashboard/followers";
import SearchComponent from "@/components/page-components/user-dashboard/SearchComponent";
import { Separator } from "@/components/ui/separator";
import { useGetUserFollowers } from "@/hooks/useGetUserFollowers";
import { getToken } from "@/lib/token";
import { followersData, followersDataProps } from "@/static-datas/followers";
import { Section } from "@/tw-components/Section";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FollowingPage = () => {
  const [getFollowers, setGetFollowers] =
    useState<followersDataProps[]>(followersData);
  const { data: followers, isLoading } = useGetUserFollowers();

  const token = getToken();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      return;
    } else {
      router.replace("/login");
    }
  }, [router]);

  const handleUnfollow = (id: string) => {
    const filteredFollower = getFollowers.filter(
      (fol) => fol.organizerId !== id
    );
    console.log(filteredFollower);
    setGetFollowers(filteredFollower);
  };

  return (
    <Layout title="Organiser you follow" showHeader showFooter showSidebar>
      <Section
        id="user-account-settings"
        className="md:px-10 overflow-y-auto w-full lg:max-w-7xl h-[80vh]"
      >
        <div className="mt-4 lg:mt-6 flex gap-3">
          <GoBack />
          <h2 className="font-pally-medium text-2xl mb-4">Following</h2>
        </div>
        <Separator />

        <div className="flex mt-4 items-center justify-between gap-4 ease-out delay-75 duration-75">
          <p className="text-[#AFB2B9] font-pally-regular text-sm md:text-base whitespace-nowrap">
            {followers?.data?.length} followers
          </p>
          {/* <SearchComponent placeholder="Search for followers" /> */}
        </div>

        {followers?.data?.map((follow) => (
          <FollowersComponent
            key={follow?.organizerId}
            name={follow?.name}
            email={follow?.email}
            organizerId={follow?.organizerId}
          />
        ))}
      </Section>
    </Layout>
  );
};

export default FollowingPage;
