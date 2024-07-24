"use client";
import { AgencyPreOnboardingFinal } from "@/components/onboarding/agency/agency-pre-step-five";
import { AgencyPreOnboardingStepFour } from "@/components/onboarding/agency/agency-pre-step-four";
import { AgencyPreOnboardingStepOne } from "@/components/onboarding/agency/agency-pre-step-one";
import { AgencyPreOnboardingStepThree } from "@/components/onboarding/agency/agency-pre-step-three";
import { AgencyPreOnboardingStepTwo } from "@/components/onboarding/agency/agency-pre-step-two";
import ClientOnly from "@/components/shared/client-only";
import HorizontalStepper from "@/components/shared/horizontal-stepper";
import ProgressBarWithButtons from "@/components/shared/progress-bar-with-buttons";
import { Button } from "@/components/ui/button";
import { atom, useAtom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { useEffect, useState } from "react";
interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passport: string;
  confirmPassword: string;
}
interface PersonalDetailsKYC {
  country: string;
  identificationType: string;
  identificationNumber: string;
  docUrl: {
    name: string;
    url: string;
    size: number;
    key?: string;
  }[];
}
interface PersonalAddress {
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  state: string;
  proofOfAddress: string;
}
interface AgencyDetails {
  agencyName: string;
  legalBusinessName?: string;
  agencyEmail: string;
  agencyUrl: string;
  rcNumber?: string;

  natureOfBusiness: string;
  businessType: string;
}
// interface AgencyDetailsKYC {
//   rcNumber: string;
//   memorandum: string;
//   certificateOfIncorporation: string;
//   taxIdentificationNumber: string;
//   shareholdersInfo?: string;
//   cacStatusReport: string;
//   // businessAddress
// }

// Personal Address
export const currentStepAtom = atom(1);
export const persoanlDetailsAtom = atom<PersonalDetails>({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  passport: "",
  confirmPassword: "",
});
export const verifyPersonalDetailsKYCAtom = atom<PersonalDetailsKYC>({
  country: "",
  identificationType: "",
  identificationNumber: "",
  docUrl: [
    {
      name: "",
      url: "",
      size: 0,
      key: "" || undefined,
    },
  ],
});
export const verifyPersonalAddressAtom = atom<PersonalAddress>({
  addressLineOne: "",
  addressLineTwo: "" || undefined,
  city: "",
  state: "",
  proofOfAddress: "",
});
export const agencyDetailsAtom = atom<AgencyDetails>({
  agencyName: "",
  legalBusinessName: "" || undefined,
  rcNumber: "" || undefined,
  agencyEmail: "",
  agencyUrl: "",
  businessType: "",
  natureOfBusiness: "",
});
// export const kycDocumentsAtom = atom<KycDocuments>({
//   // ... initialize KYC document fields
// });

export const otpAtom = atom<string | null>(null);
export const isOtpVerifiedAtom = atom(false);

export const suggestedUrlsAtom = atom<string[]>([]);
export const isUrlValidAtom = atom(false);

export const isSubmittingAtom = atom(false);
export const submissionErrorAtom = atom<string | null>(null);

export enum Step {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
}

type PrevStep = number;

const firstStep = Step.StepOne;

export const AgencyPreOnboardingAtom = atomWithReset<Step>(firstStep);

export const useAgencyPeOnboardingAtom = () => {
  const [step, setStep] = useAtom(AgencyPreOnboardingAtom);
  const [prevStep, setPrevStep] = useState<PrevStep | null>(null);

  useEffect(() => {
    setPrevStep(step);
  }, [step]);

  function goToNextStep() {
    setStep(step + 1);
  }

  function goToPreviousStep() {
    setStep(step > firstStep ? step - 1 : step);
  }

  function resetStepper() {
    setPrevStep(null);
    setStep(firstStep);
  }

  return {
    step,
    setStep,
    resetStepper,
    goToNextStep,
    goToPreviousStep,
    prevStep,
  };
};

const MAP_STEP_TO_COMPONENT = {
  [Step.StepOne]: AgencyPreOnboardingStepOne,
  [Step.StepTwo]: AgencyPreOnboardingStepTwo,
  [Step.StepThree]: AgencyPreOnboardingStepFour,
  [Step.StepFour]: AgencyPreOnboardingStepThree,
  [Step.StepFive]: AgencyPreOnboardingFinal,
};

export const agencyPreOnboardingTotalSteps = Object.keys(
  MAP_STEP_TO_COMPONENT
).length;
export const AgencyPreOnboardingMultiStep = () => {
  const [step] = useAtom(AgencyPreOnboardingAtom);
  const Component = MAP_STEP_TO_COMPONENT[step];
  const { goToPreviousStep, goToNextStep } = useAgencyPeOnboardingAtom();

  // const componentProps = {
  //   clientUser: any
  // }
  return (
    <div className="h-fit bg-white shadow rounded-[10px] p-2 grid grid-cols-12 gap-2 w-full lg:w-[1000px]">
      <div className="bg-[#fcfcfc] border flex flex-col justify-between rounded-[10px] col-span-8 py-8 px-6 w-full">
        <HorizontalStepper
          currentStep={step}
          totalSteps={agencyPreOnboardingTotalSteps}
        />
        <ClientOnly>
          <Component />
        </ClientOnly>
        {/* <ProgressBarWithButtons
          currentStep={step}
          totalSteps={agencyPreOnboardingTotalSteps}
          onBack={goToPreviousStep}
          onContinue={goToNextStep}
          isLastStep={step === agencyPreOnboardingTotalSteps - 1}
        /> */}
        {/* <div>
            <h3 className="text-xl font-bold">Personal Information</h3>
            <p className="text-sm font-normal">
              Fill out these details to create your account
            </p>
          </div>
          <AgencyPersonalInformation /> */}
        {/* <h2>Agency Essentials</h2>
          <h3>KYC Documents</h3> */}
      </div>
      <div className="bg-white border rounded-[10px] flex flex-col gap-4 col-span-4 py-8 px-6 w-full">
        <div className="flex items-center gap-4 ">
          <div className="">
            <div className="size-12 rounded-full flex items-center justify-center bg-primary text-white">
              <h1 className="text-lg font-bold">1</h1>
            </div>
          </div>
          <div className="space-y-1">
            <h5 className="text-sm font-semibold">Create your account</h5>
            <p className="text-xs font-normal">
              Fill out these details to create your account
            </p>{" "}
          </div>
        </div>
        <div className="flex items-center gap-4 ">
          <div className="">
            <div className="size-12 rounded-full flex items-center justify-center bg-primary text-white">
              <h1 className="text-lg font-bold">2</h1>
            </div>
          </div>
          <div className="space-y-1">
            <h5 className="text-sm font-semibold">Verify your identity</h5>
            <p className="text-xs font-normal">
              Fill and upload a valid means of identification
            </p>{" "}
          </div>
        </div>
        <div className="flex items-center gap-4 ">
          <div className="">
            <div className="size-12 rounded-full flex items-center justify-center bg-primary text-white">
              <h1 className="text-lg font-bold">3</h1>
            </div>
          </div>
          <div className="space-y-1">
            <h5 className="text-sm font-semibold">Verify your home address</h5>
            <p className="text-xs font-normal">
              Fill out your home address details and upload a proof of address
            </p>{" "}
          </div>
        </div>
        <div className="flex items-center gap-4 ">
          <div className="">
            <div className="size-12 rounded-full flex items-center justify-center bg-primary text-white">
              <h1 className="text-lg font-bold">4</h1>
            </div>
          </div>
          <div className="space-y-1">
            <h5 className="text-sm font-semibold">Agency Essentials</h5>
            <p className="text-xs font-normal">
              Fill out these basic agency details
            </p>{" "}
          </div>
        </div>
        <div className="flex items-center gap-4 ">
          <div className="">
            <div className="size-12 rounded-full flex items-center justify-center bg-primary text-white">
              <h1 className="text-lg font-bold">5</h1>
            </div>
          </div>
          <div className="space-y-1">
            <h5 className="text-sm font-semibold">Review</h5>
            <p className="text-xs font-normal">
              Fill out these details to create your account
            </p>{" "}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <h4 className="text-sm font-bold">Need Help?</h4>
          <p className="text-xs font-normal">
            Get to know how to setup your agency startup on Golobe
          </p>
          <Button variant={"outline"}>Contact Us</Button>
        </div>
      </div>
    </div>
  );
};
