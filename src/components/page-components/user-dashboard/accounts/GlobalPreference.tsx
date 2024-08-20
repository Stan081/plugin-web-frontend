import { Separator } from "@/components/ui/separator";
import React, { Fragment } from "react";

const GlobalPreference = () => {
  return (
    <Fragment>
      <ul className="space-y-5">
        <li className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="font-pally-medium text-lg">Preferred Language</h3>
            <p className="text-[#586170] font-pally-regular">English</p>
          </div>
          <p className="font-pally-medium underline cursor-pointer">Change</p>
        </li>
        <Separator />
        <li className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="font-pally-medium text-lg">Preferred Currency</h3>
            <p className="text-[#586170] font-pally-regular">Naira(₦)</p>
          </div>
          <p className="font-pally-medium underline cursor-pointer">Change</p>
        </li>
        <Separator />
        <li className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="font-pally-medium text-lg">Time Zone</h3>
            <p className="text-[#586170] font-pally-regular">
              ( GMT +01:00 ) Nigeria
            </p>
          </div>
          <p className="font-pally-medium underline cursor-pointer">Change</p>
        </li>
        <Separator />
      </ul>
    </Fragment>
  );
};

export default GlobalPreference;
