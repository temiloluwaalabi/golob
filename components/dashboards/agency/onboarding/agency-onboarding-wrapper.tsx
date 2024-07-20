// @flow
import { AgencyInitialSteps } from "@/components/cards/agency-initial-steps";
import ClientOnly from "@/components/shared/client-only";
import { Button } from "@/components/ui/button";
import * as React from "react";
type Props = {};
export const AgencyOnboardingWrapper = (props: Props) => {
  return (
    <div className="h-fit bg-white shadow rounded-[10px] p-2 grid grid-cols-12 gap-2 w-full lg:w-[1000px]">
      <div className="bg-[#fcfcfc] border flex flex-col rounded-[10px] col-span-8 py-8 px-6 w-full">
        <ClientOnly>
          <AgencyInitialSteps />
        </ClientOnly>
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
            <h5 className="text-sm font-semibold">Verify your identity</h5>
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
            <h5 className="text-sm font-semibold">Agency Essentials</h5>
            <p className="text-xs font-normal">
              Fill out these details to create your account
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
            <h5 className="text-sm font-semibold">
              Verify Company Email Address
            </h5>
            <p className="text-xs font-normal">
              Fill out these details to create your account
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
            <h5 className="text-sm font-semibold">KYC Documents</h5>
            <p className="text-xs font-normal">
              Fill out these details to create your account
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
