import CampaignType from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/CampaignType";
import ReviewCampaign from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/ReviewCampaign";
import Campaign from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/Campaign";
import SelectEvent from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/SelectEvent";
import SetupSteps from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/SetupSteps";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import Container from "@/tw-components/container";
import React, { useState } from "react";
import TargetAudience from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/TargetAudience";
import DurationBudget from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/DurationBudget";
import AdContent from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/AdContent";

const SetUpCampaign = () => {
  const { currentStep } = useOrganiserDashContext();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CampaignType />;
      case 1.1:
        return <TargetAudience />;
      case 1.2:
        return <DurationBudget />;
      case 1.2:
        return <AdContent />;
      case 2:
        return <SelectEvent />;
      case 3:
        return <Campaign />;
      case 4:
        return <ReviewCampaign />;
      default:
        return;
    }
  };
  return (
    <div className="lg:bg-[#ebe7e4]">
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
