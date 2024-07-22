"use client";
import React from "react";

interface HorizontalStepperProps {
  currentStep: number;
  totalSteps: number;
}
export const stepsData = [
  {
    title: "Create An Account",
    description: "Provide your personal information.",
  },
  {
    title: "Verify Your Email",
    description: "Enter the OTP sent to your inbox.",
  },
  { title: "Agency Details", description: "Tell us about your agency." },
  { title: "KYC Verification", description: "Upload the necessary documents." },
  { title: "Await Approval", description: "Your application is under review." },
];
const HorizontalStepper = ({
  currentStep,
  totalSteps,
}: HorizontalStepperProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center mb-8">
      {steps.map((step) => (
        <div key={step} className="relative w-full flex items-center">
          <div
            className={`size-8 rounded-full z-20 flex items-center justify-center font-bold transition-colors duration-300 ${
              step <= currentStep
                ? "bg-primary text-white"
                : step === currentStep + 1
                ? "bg-green-200 text-primary-blackishGreen"
                : "bg-gray-300 text-gray-500"
            } ${
              step === currentStep ? "ring-2 ring-primary ring-offset-2" : ""
            } `}
          >
            {step}
          </div>

          {step < totalSteps && (
            <div
              className={`absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-300 ease-in-out   w-full h-px   ${
                step <= currentStep
                  ? "bg-primary"
                  : step === currentStep + 1
                  ? "bg-green-200"
                  : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default HorizontalStepper;
