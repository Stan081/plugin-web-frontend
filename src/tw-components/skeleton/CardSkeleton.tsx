import { Skeleton } from "@/components/ui/skeleton";
import React, { Fragment } from "react";

const CardSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      <div className=" w-full max-w-xs">
        <Skeleton className="h-36 w-full" />
        <div className="space-y-2 mt-4 block">
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[100px]" />
        </div>
      </div>
      <div className=" w-full max-w-xs hidden md:block">
        <Skeleton className="h-36 w-full" />
        <div className="space-y-2 mt-4 block">
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[100px]" />
        </div>
      </div>
      <div className=" w-full max-w-xs hidden md:block">
        <Skeleton className="h-36 w-full" />
        <div className="space-y-2 mt-4 block">
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[100px]" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
