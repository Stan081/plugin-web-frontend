import { Skeleton } from "@/components/ui/skeleton";
import { useGetOrgProfileById } from "@/hooks/organiser/useGetOrganiserProfile";
import Container from "@/tw-components/container";
import Image from "next/image";
import React from "react";

const OrganiserTitle = () => {
  const { data: orgProfile, isLoading } = useGetOrgProfileById();
  const OrganiserContent = () => {
    return (
      <div className="border-t-4 shadow-md border-[#281E172E] rounded-lg p-4 bg-[#F6F7F8] hidden lg:flex gap-4">
        {isLoading ? (
          <Skeleton className="w-16 h-16 rounded-md" />
        ) : (
          <Image
            src={orgProfile?.data?.thumbnail ?? "/images/blue-bg.png"}
            alt={orgProfile?.data?.name ?? "Organiser name"}
            width={56}
            height={56}
            className="w-16 h-16 pointer-events-none object-cover rounded-md"
          />
        )}
        <div className="flex flex-col justify-between">
          {isLoading ? (
            <Skeleton className="w-36 h-7" />
          ) : (
            <p className="text-lg text-[#101928] font-pally-medium">
              {orgProfile?.data?.name
                ? orgProfile?.data?.name?.slice(0, 1).toLocaleUpperCase() +
                  orgProfile?.data?.name.slice(1)
                : orgProfile?.data?.name}
            </p>
          )}
          <div className="flex items-center gap-4">
            <p className="text-[#667185] font-pally-regular text-base">
              2 Events Hosted
            </p>
            <div className="border border-[#667185] h-4" />
            <p className="text-[#667185] font-pally-regular text-base">
              36 followers
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Container>
      <div className=" flex justify-between pt-7 pb-4 md:pt-20">
        {isLoading ? (
          <Skeleton className="w-48 h-12" />
        ) : (
          <h1 className="text-[#2E394C] font-pally-bold text-2xl lg:text-5xl">
            Welcome{" "}
            {orgProfile?.data?.name
              ? orgProfile?.data?.name?.slice(0, 1).toLocaleUpperCase() +
                orgProfile?.data?.name.slice(1)
              : orgProfile?.data?.name}
          </h1>
        )}
        <OrganiserContent />
      </div>
    </Container>
  );
};

export default OrganiserTitle;
