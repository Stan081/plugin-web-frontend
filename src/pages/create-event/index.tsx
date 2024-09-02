"use client";
import React, { useState } from "react";
import Container from "@/tw-components/container";
import Logo from "@/components/Logo";
import StepOne from "@/components/page-components/create-events/StepOne";
import StepTwo from "@/components/page-components/create-events/StepTwo";
import StepThree from "@/components/page-components/create-events/StepThree";

export interface StepsProps {
  next: () => void;
  previous: () => void;
}

export default function Signup() {
  const [currentStep, setCurrentStep] = useState<number>(2);

  const nextStep = () => {
    if (currentStep < 10) {
      setCurrentStep(currentStep + 1);
      console.log(currentStep);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev--);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne next={nextStep} previous={previousStep} />;
      case 2:
        return <StepTwo next={nextStep} previous={previousStep} />;
      case 3:
        return <StepThree next={nextStep} previous={previousStep} />;
      case 4:
        return <div>Step 4</div>;
      default:
        return;
    }
  };
  return (
    <div className="bg-[#f0ded1] h-screen bg-cover bg-no-repeat py-3">
      <Container>
        <Logo />
        <div className="scrollbar-hide">{renderStepContent()}</div>
      </Container>
    </div>
  );
}
