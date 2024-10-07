import CampaignType from "@/components/page-components/organisers/organiser-dashboard/ad-campaigne/set-up/CampaignType";
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
      default:
        return;
    }
  };
  return (
    <div className="bg-[#ebe7e4] lg:h-screen w-svw bg-cover bg-no-repeat py-3">
      <Container className="px-0">
        <div className="flex">
          <SetupSteps />
          {renderStepContent()}
        </div>
      </Container>
    </div>
  );
};

export default SetUpCampaign;
