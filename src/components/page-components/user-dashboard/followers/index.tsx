import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUnfollow } from "@/pages/api/mutate/follow/followOrg";
import { followersDataProps } from "@/static-datas/followers";
import React, { useState } from "react";

const FollowersComponent: React.FC<followersDataProps> = ({
  name,
  organizerId,
  email,
}) => {
  const { mutate: removeFollow, isPending: isPendingUnfollow } =
    useUnfollow(organizerId);
  return (
      <div className="mt-4 flex justify-between items-center pb-5">
        <div className="flex flex-col items-start">
          <p className="text-base md:text-lg font-pally-medium">{name}</p>
          <p className="text-sm md:text-base font-pally-regular">{email}</p>
        </div>
        {!isPendingUnfollow ? (
          <Skeleton className="w-16 h-7" />
        ) : (
          <Button onClick={() => removeFollow()} variant="outline" size="sm">
            Unfollow
          </Button>
        )}
      </div>
  );
};

export default FollowersComponent;
