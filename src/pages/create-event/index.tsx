"use client";
import React, { useState } from "react";
import Container from "@/tw-components/container";
import Logo from "@/components/Logo";
import StepOne from "@/components/page-components/create-events/StepOne";
import StepTwo from "@/components/page-components/create-events/StepTwo";

export interface StepsProps {
  next: () => void;
  previous: () => void;
}

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne next={nextStep} previous={previousStep} />;
      case 2:
        return <StepTwo next={nextStep} previous={previousStep} />;
      case 3:
        return <div>Step 3</div>;
      case 4:
        return <div>Step 4</div>;
      default:
        return;
    }
  };
  return (
    <div className="bg-[#f0ded1] h-screen bg-cover bg-no-repeat py-3">
      {/* <div className="flex justify-between mt-8">
        <button
          onClick={previousStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 flex items-center gap-2 font-medium ${
            currentStep === 1
              ? "bg-transparent text-[#000000] cursor-not-allowed opacity-20"
              : "text-[#000000]"
          }`}
        >
          <FaAngleLeft /> Previous
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 flex items-center gap-2 font-medium ${
            currentStep === 1
              ? "bg-transparent text-[#000000] cursor-not-allowed opacity-20"
              : "text-[#000000]"
          }`}
        >
          <FaAngleLeft /> Previous
        </button>

      </div> */}

      <Container>
        <Logo />

        <div className="scrollbar-hide">{renderStepContent()}</div>
      </Container>
    </div>
  );
}
