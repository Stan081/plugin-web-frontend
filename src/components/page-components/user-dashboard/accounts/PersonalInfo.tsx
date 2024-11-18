import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMe } from "@/pages/api/query/me";
import React, { Fragment, useState } from "react";
import { RiEditLine } from "react-icons/ri";
import EditUserAcount from "./EditUserAcount";

const PersonalInfo = () => {
  const { data: user, isLoading } = useMe();
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <Fragment>
      {isShow && <EditUserAcount open={isShow} close={() => setIsShow(!isShow)}/>}
      <ul className="space-y-4">
        <li className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="font-pally-medium text-lg">Full Name</h3>
            {isLoading ? (
              <Skeleton className="h-6 w-[200px]" />
            ) : (
              <p className="text-[#586170] font-pally-regular">
                {user?.data?.name?.firstname + " " + user?.data?.name?.lastname}
              </p>
            )}
          </div>
          <div
            onClick={() => setIsShow(!isShow)}
            className="border border-[#586170] rounded-md p-1 cursor-pointer hover:border-black hover:shadow-md"
          >
            <RiEditLine size={24} className="text-[#586170]" />
          </div>
        </li>
        <Separator />
        <li className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="font-pally-medium text-lg">Email Address</h3>
            {isLoading ? (
              <Skeleton className="h-6 w-[200px]" />
            ) : (
              <p className="text-[#586170] font-pally-regular">
                {user?.data?.email}
              </p>
            )}
          </div>
        </li>
        <Separator />
        <li className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="font-pally-medium text-lg">Phone Number</h3>
            {isLoading ? (
              <Skeleton className="h-6 w-[200px]" />
            ) : (
              <p className="text-[#586170] font-pally-regular">
                {user?.data?.contact?.phone}
              </p>
            )}
          </div>
        </li>
        <Separator />
        <li className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="font-pally-medium text-lg">Address</h3>
            {isLoading ? (
              <Skeleton className="h-6 w-[200px]" />
            ) : (
              <p className="text-[#586170] font-pally-regular">
                {user?.data?.contact?.country}
              </p>
            )}
          </div>
        </li>
        <Separator />
      </ul>
    </Fragment>
  );
};

export default PersonalInfo;
