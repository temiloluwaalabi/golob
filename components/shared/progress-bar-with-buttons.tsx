import { ChevronLeft } from "lucide-react";
import React from "react";

import { Button } from "../ui/button";

interface ProgressBarWithButtonsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onContinue: () => void;
  isLastStep: boolean;
}

const ProgressBarWithButtons = ({
  currentStep,
  totalSteps,
  onBack,
  onContinue,
  isLastStep,
}: ProgressBarWithButtonsProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1); // Create an array of steps
  return (
    <div className="mb-8 mt-4 flex w-full flex-col items-center justify-between">
      {/* Buttons */}
      <div className="mt-4 flex w-full items-center justify-between gap-4">
        <Button onClick={onBack} disabled={currentStep === 0} variant={"ghost"}>
          <ChevronLeft className="me-2 size-4" />
          Back
        </Button>
        <div className="flex w-fit items-center gap-2">
          {steps.map((step) => (
            <div
              key={step}
              className={`
            h-[8px] w-[38px] flex-1 rounded-full transition-all duration-500 ease-in-out 
            ${
              step <= currentStep
                ? "bg-primary"
                : "bg-[#E2E8F0] dark:bg-gray-700"
            }
          `}
            />
          ))}
        </div>
        <Button
          type="submit"
          onClick={onContinue}
          className="text-primary"
          variant={"ghost"}
          // disabled={isLastStep}
        >
          {isLastStep ? "Submit" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default ProgressBarWithButtons;
