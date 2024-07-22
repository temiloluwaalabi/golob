import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

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
    <div className="flex flex-col mt-4 items-center justify-between mb-8 w-full">
      {/* Buttons */}
      <div className="flex items-center gap-4 justify-between w-full mt-4">
        <Button onClick={onBack} disabled={currentStep === 0} variant={"ghost"}>
          <ChevronLeft className="size-4 me-2" />
          Back
        </Button>
        <div className="flex items-center w-fit gap-2">
          {steps.map((step) => (
            <div
              key={step}
              className={`
            h-[8px] rounded-full flex-1 w-[38px] transition-all duration-500 ease-in-out 
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
