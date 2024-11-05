"use client";
import React, { useEffect, useState } from "react";
import Container from "@/tw-components/container";
import StepOne from "@/components/page-components/create-events/StepOne";
import StepTwo from "@/components/page-components/create-events/StepTwo";
import StepThree from "@/components/page-components/create-events/StepThree";
import StepFour from "@/components/page-components/create-events/StepFour";
import StepFive from "@/components/page-components/create-events/StepFive";
import StepSix from "@/components/page-components/create-events/StepSix";
import StepSeven from "@/components/page-components/create-events/StepSeven";
import { getToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { getCookie, removeCookie, setCookie } from "@/lib/cookies";

export interface StepsProps {
  next?: () => void;
  previous?: () => void;
}

export default function CreateEvent() {
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const savedStep = getCookie("currentStep");
    return savedStep ? Number(savedStep) : 1;
  });
  const token = getToken();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      return;
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    setCookie("currentStep", currentStep.toString());
  }, [currentStep]);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const clearStep = () => {
    setTimeout(() => {
      removeCookie("currentStep");
      setCurrentStep(1);
      router.push(`/organiser`);
    }, 10000);
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
        return <StepFour next={nextStep} previous={previousStep} />;
      case 5:
        return <StepFive next={nextStep} previous={previousStep} />;
      case 6:
        return <StepSix next={nextStep} previous={previousStep} />;
      case 7:
        return <StepSeven clearStep={clearStep} />;
      default:
        return;
    }
  };
  return (
    <div className="bg-[#f0ded1] lg:h-screen w-svw bg-cover bg-no-repeat py-3">
      <Container className="px-0">
        <div className="scrollbar-hide ">{renderStepContent()}</div>
      </Container>
    </div>
  );
}
