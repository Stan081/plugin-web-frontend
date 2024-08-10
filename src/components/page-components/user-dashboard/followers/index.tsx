import { Separator } from "@/components/ui/separator";
import { followersData, followersDataProps } from "@/static-datas/followers";
import Image from "next/image";
import React, { useState } from "react";

const FollowersComponent = () => {
  const [getFollowers, setGetFollowers] =
    useState<followersDataProps[]>(followersData);

  const handleUnfollow = (id: string) => {
    const filteredFollower = getFollowers.filter((fol) => fol.id !== id);
    console.log(filteredFollower);
    setGetFollowers(filteredFollower);
  };

  console.log(getFollowers);
  return (
    <ul className="space-y-4 mt-5">
      {getFollowers?.map((follower, index) => (
        <li key={index}>
          <div className="flex justify-between pb-5">
            <div className="flex items-center gap-3">
              <Image
                src={`${follower.image}`}
                width={40}
                height={40}
                alt={`${follower.name}`}
                className="pointer-events-none w-10 h-10 object-cover rounded-full"
              />
              <p className="text-base md:text-lg font-pally-medium">
                {follower.name}
              </p>
            </div>
            <button
              onClick={() => handleUnfollow(follower.id)}
              className="border border-[#101928] rounded-lg py-1 px-2 font-pally-medium text-base "
            >
              Unfollow
            </button>
          </div>
          {index === getFollowers?.length - 1 ? "" : <Separator />}
        </li>
      ))}
    </ul>
  );
};

export default FollowersComponent;
