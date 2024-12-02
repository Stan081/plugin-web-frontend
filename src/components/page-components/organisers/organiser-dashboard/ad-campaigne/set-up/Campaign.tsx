"use client";

import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import React from "react";
import { campaignPlans } from "./CampaignType";
import SocialMediaAds from "./campaignForms/SocialMediaAds";
import SponsorListing from "./campaignForms/SponsorListing";
import EmailCampiagn from "./campaignForms/EmailCampiagn";
import { Separator } from "@/components/ui/separator";

const Campaign = () => {
  const { isClickedCampaign } = useOrganiserDashContext();

  const campainForm = campaignPlans.find(
    (item) => item.id === isClickedCampaign
  );
  return (
    <div className="w-full md:w-3/5 p-10 rounded-lg h-screen bg-white">
      <div className="py-5 space-y-2">
        <h2 className="font-pally-medium text-2xl">Basic Information</h2>
        <p className="text-[#475367] font-pally-regular text-sm md:text-base">
          Fill this form to avoid your mails being sent to spam Inbox.
        </p>
      </div>
      <Separator />

      {isClickedCampaign === 1 && <SocialMediaAds />}
      {isClickedCampaign === 2 && <EmailCampiagn />}
      {isClickedCampaign === 3 && <SponsorListing />}
    </div>
  );
};

export default Campaign;
