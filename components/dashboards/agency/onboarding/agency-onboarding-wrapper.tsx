// @flow
import * as React from "react";

import { AgencyInitialSteps } from "@/components/cards/agency-initial-steps";
import ClientOnly from "@/components/shared/client-only";
import { Button } from "@/components/ui/button";

export const AgencyOnboardingWrapper = () => {
  return (
    <div className="grid h-fit w-full grid-cols-12 gap-2 rounded-[10px] bg-white p-2 shadow lg:w-[1000px]">
      <div className="col-span-8 flex w-full flex-col rounded-[10px] border bg-[#fcfcfc] px-6 py-8">
        <ClientOnly>
          <AgencyInitialSteps />
        </ClientOnly>
      </div>
      <div className="col-span-4 flex w-full flex-col gap-4 rounded-[10px] border bg-white px-6 py-8">
        <div className="flex items-center gap-4 ">
          <div className="">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
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
            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
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
            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
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
            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-white">
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
    </div>
  );
};
