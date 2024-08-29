
"use client";
import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

import Link from "next/link";


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
        return <div>Step 1</div>;
      case 2:
        return <div>Step 2</div>;
      case 3:
        return <div>Step 3</div>;
      case 4:
        return <div>Step 4</div>;
      default:
        return;
    }
  };
  return (
    <div>
      <div className="flex justify-between mt-8">
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
      </div>
      <div className="mt-10 scrollbar-hide">{renderStepContent()}</div>
      
    </div>
  );
}