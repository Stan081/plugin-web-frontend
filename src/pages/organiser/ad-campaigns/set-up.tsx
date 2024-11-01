import CampaignType from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/CampaignType";
import ReviewCampaign from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/ReviewCampaign";
import SelectCampaign from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/SelectCampaign";
import SelectEvent from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/SelectEvent";
import SetupSteps from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/SetupSteps";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import Container from "@/tw-components/container";
import React, { useState } from "react";

const SetUpCampaign = () => {
  const { currentStep } = useOrganiserDashContext();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CampaignType />;
      case 2:
        return <SelectEvent />;
      case 3:
        return <SelectCampaign />;
      case 4:
        return <ReviewCampaign />;
      default:
        return;
    }
  };
  return (
    <div className="bg-[#ebe7e4]">
      <Container className="px-0">
        <div className="flex items-start">
          <SetupSteps />
          {renderStepContent()}
        </div>
      </Container>
    </div>
  );
};

export default SetUpCampaign;
