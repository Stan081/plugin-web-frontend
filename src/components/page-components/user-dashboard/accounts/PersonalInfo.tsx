import { Separator } from "@/components/ui/separator";
import React, { Fragment } from "react";
import { RiEditLine } from "react-icons/ri";

const PersonalInfo = () => {
  return (
    <Fragment>
      <ul className="space-y-4">
        <li className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="font-pally-medium text-lg">Full Name</h3>
            <p className="text-[#586170] font-pally-regular">Bennie Elenda</p>
          </div>
          <div className="border border-[#586170] rounded-md p-1 cursor-pointer hover:border-black hover:shadow-md">
            <RiEditLine size={24} className="text-[#586170]" />
          </div>
        </li>
        <Separator />
        <li className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="font-pally-medium text-lg">Email Address</h3>
            <p className="text-[#586170] font-pally-regular">
              oluchiMiracle@gmail.com
            </p>
          </div>
        </li>
        <Separator />
        <li className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="font-pally-medium text-lg">Phone Number</h3>
            <p className="text-[#586170] font-pally-regular">070 767 89763</p>
          </div>
        </li>
        <Separator />
        <li className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="font-pally-medium text-lg">Address</h3>
            <p className="text-[#586170] font-pally-regular">Not Provided</p>
          </div>
        </li>
        <Separator />
      </ul>
    </Fragment>
  );
};

export default PersonalInfo;
