/* eslint-disable no-unused-vars */
"use client";
import { atom, useAtom } from "jotai";
import { atomWithReset, atomWithStorage } from "jotai/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod";

import { AgencyPreOnboardingFinal } from "@/components/onboarding/agency/agency-pre-step-five";
import { AgencyPreOnboardingStepFour } from "@/components/onboarding/agency/agency-pre-step-four";
import { AgencyPreOnboardingStepOne } from "@/components/onboarding/agency/agency-pre-step-one";
import { AgencyPreOnboardingStepThree } from "@/components/onboarding/agency/agency-pre-step-three";
import { AgencyPreOnboardingStepTwo } from "@/components/onboarding/agency/agency-pre-step-two";
import ClientOnly from "@/components/shared/client-only";
import HorizontalStepper from "@/components/shared/horizontal-stepper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCurrentUser } from "@/hooks/use-current-user";
import { GeneralPreOnboardingSchema } from "@/lib/validations";

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  // passport: string;
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
  addressProofType: string;

  proofOfAddress: {
    name: string;
    url: string;
    size: number;
    key?: string;
  }[];
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

export const initialPreOnboardingData: z.infer<
  typeof GeneralPreOnboardingSchema
> = {
  country: "",
  identificationType: "",
  identificationNumber: "",
  docUrl: [
    {
      name: "",
      url: "",
      size: 0,
      key: undefined,
    },
  ],
  addressLineOne: "",
  addressLineTwo: undefined,
  city: "",
  state: "",
  addressProofType: "",

  proofOfAddress: [
    {
      name: "",
      url: "",
      size: 0,
      key: undefined,
    },
  ],
  agencyName: "",
  legalBusinessName: undefined,
  rcNumber: undefined,
  agencyEmail: "",
  agencyUniquePrefix: "",
  businessType: "",
  natureOfBusiness: "",
};

export const PreOnboardingData = atomWithStorage<
  z.infer<typeof GeneralPreOnboardingSchema>
>("PreOnboardingData", initialPreOnboardingData);

export const persoanlDetailsAtom = atom<PersonalDetails>({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  // passport: "",
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
      key: undefined,
    },
  ],
});
export const verifyPersonalAddressAtom = atom<PersonalAddress>({
  addressLineOne: "",
  addressLineTwo: undefined,
  city: "",
  state: "",
  addressProofType: "",

  proofOfAddress: [
    {
      name: "",
      url: "",
      size: 0,
      key: undefined,
    },
  ],
});
export const agencyDetailsAtom = atom<AgencyDetails>({
  agencyName: "",
  legalBusinessName: undefined,
  rcNumber: undefined,
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
  const [openDialog, setOpenDialog] = useState(false);
  const Component = MAP_STEP_TO_COMPONENT[step];
  // const { goToPreviousStep, goToNextStep } = useAgencyPeOnboardingAtom();
  const user = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) {
      setOpenDialog(true);
    }
  }, [user?.id]);
  // const componentProps = {
  //   clientUser: any
  // }
  return (
    <div className="flex w-full items-center justify-center">
      <div className="grid h-fit w-full grid-cols-12 gap-2 rounded-[10px] bg-white p-2 shadow lg:w-[1000px]">
        <div className="col-span-8 flex w-full flex-col justify-between rounded-[10px] border bg-[#fcfcfc] px-6 py-8">
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
        <div className="col-span-4 flex w-full flex-col gap-4 rounded-[10px] border bg-white px-6 py-8">
          <div className="flex items-center gap-4 ">
            <div className="">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
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
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
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
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
                <h1 className="text-lg font-bold">3</h1>
              </div>
            </div>
            <div className="space-y-1">
              <h5 className="text-sm font-semibold">
                Verify your home address
              </h5>
              <p className="text-xs font-normal">
                Fill out your home address details and upload a proof of address
              </p>{" "}
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <div className="">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
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
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
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
          <div className="mt-auto flex flex-col gap-2">
            <h4 className="text-sm font-bold">Need Help?</h4>
            <p className="text-xs font-normal">
              Get to know how to setup your agency startup on Golobe
            </p>
            <Button variant={"outline"}>Contact Us</Button>
          </div>
        </div>
        <ClientOnly>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <Card className=" flex h-full flex-col gap-8 rounded-[10px] border-none bg-white p-0 shadow-none outline-none focus-visible:ring-0  focus-visible:!ring-offset-0">
                <CardHeader className="p-0">
                  <CardTitle>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">Please Login</h3>
                      {/* <Button
              variant={"link"}
              className="flex items-center"
              onClick={() => router.push("/auth/login")}
            >
              Login <ChevronRight className="size-4 ms-2" />
            </Button> */}
                    </div>
                  </CardTitle>
                  <CardDescription>
                    <p className="text-sm font-normal">
                      You&apos;ve to be logged into your account to start the
                      agency onboarding process, please visit the login page to
                      access your account or the registration page to create
                      your account
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between gap-4 p-0">
                  <Button
                    className="w-full"
                    variant={"outline"}
                    onClick={() => router.push("/auth/login")}
                  >
                    Login
                  </Button>
                  <Button
                    className="w-full hover:bg-primary-blackishGreen"
                    onClick={() => router.push("/auth/sign-up")}
                  >
                    Sign Up
                  </Button>
                </CardFooter>
              </Card>
            </DialogContent>
          </Dialog>
        </ClientOnly>
      </div>
    </div>
  );
};
