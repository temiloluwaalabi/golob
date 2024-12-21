import React from "react";

import { AgencyPreOnboardingMultiStep } from "@/store/agency-pre-onboarding";

const Agency = () => {
  return (
    <div className="flex w-full  items-center justify-center p-20">
      <AgencyPreOnboardingMultiStep />
    </div>
  );
};

export default Agency;
