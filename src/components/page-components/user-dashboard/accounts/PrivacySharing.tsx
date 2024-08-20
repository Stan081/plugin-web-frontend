import { Separator } from "@/components/ui/separator";
import React, { Fragment } from "react";

const PrivacySharing = () => {
  return (
    <Fragment>
      <div className="flex items-start justify-between mb-5">
        <div className="w-full md:max-w-xl">
          <h4 className="font-pally-medium text-2xl mb-2 text-[#771716]">
            Privacy Policy
          </h4>
          <p className="text-[#586170] font-pally-regular">
            This privacy policy explains how we collect, use, share, and protect
            your personal information when you use our website and mobile app.
          </p>
        </div>
        <p className="font-pally-medium">Effective Date: July 15, 2024</p>
      </div>
      <Separator/>


    </Fragment>
  );
};

export default PrivacySharing;
