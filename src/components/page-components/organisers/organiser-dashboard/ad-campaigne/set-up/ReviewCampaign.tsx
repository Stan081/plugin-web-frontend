import { Separator } from "@/components/ui/separator";
import React from "react";

const ReviewCampaign = () => {
  return (
    <div className="w-full md:w-3/5 p-10 rounded-lg h-screen bg-white flex flex-col justify-between">
      <div>
        <div className="space-y-4">
          <h2 className="text-4xl font-pally-medium">
            Review and Start Campaign{" "}
          </h2>
          <p className="text-[#475367] font-pally-regular text-lg">
            Review your preferences before starting a campaign
          </p>
          <Separator />
        </div>
      </div>
    </div>
  );
};

export default ReviewCampaign;
