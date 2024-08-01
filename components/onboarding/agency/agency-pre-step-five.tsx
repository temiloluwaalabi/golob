"use client";
import React from "react";

import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PreOnboardingData } from "@/store/agency-pre-onboarding";
import { useAtom } from "jotai";

// @flow
type Props = {};
export const AgencyPreOnboardingFinal = (props: Props) => {
  const pathname = usePathname();
  const [generalData, setGeneralData] = useAtom(PreOnboardingData);

  return (
    <Card className="border-none bg-transparent outline-none focus-visible:ring-0 focus-visible:!ring-offset-0 shadow-none p-0 flex flex-col h-full   gap-8">
      <CardHeader className="p-0">
        <CardTitle>
          <h3 className="text-xl font-bold">Reviewing Your Agency Details</h3>
        </CardTitle>
        <CardDescription>
          <p className="text-sm font-normal">
            Your Agency Account has been created successfully
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 space-y-6">
        <div className="border p-4 rounded-[10px] space-y-2">
          <h2 className="text-base font-semibold">Verify Agency Email</h2>
          <p className="text-sm">
            A verification link has been sent to your mail for you to verify
            your agency email. Please verify the email.
          </p>
        </div>
        <div className="border p-4 rounded-[10px] space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold">Reviewing Account</h2>
            <p className="p-2 bg-green-100 rounded-md font-semibold text-green-600">
              Pending
            </p>
          </div>
          <p className="text-sm">
            The status of your account is currently pending. Your account is
            currently being reviewed. It will be activated upon validation of
            your personal identity verification and business name verification.
            After then, you can proceed to the second on-boarding process within
            your personalizad dashboard. Please use the link below to take a
            tour of our dashboard.
          </p>
          <Button
            className="bg-primary-blackishGreen hover:bg-primary mt-4"
            asChild
          >
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
