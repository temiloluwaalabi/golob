"use client";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// @flow
export const AgencyPreOnboardingFinal = () => {
  return (
    <Card className="flex h-full flex-col gap-8 border-none bg-transparent p-0 shadow-none outline-none focus-visible:ring-0   focus-visible:!ring-offset-0">
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
      <CardContent className="space-y-6 p-0">
        <div className="space-y-2 rounded-[10px] border p-4">
          <h2 className="text-base font-semibold">Verify Agency Email</h2>
          <p className="text-sm">
            A verification link has been sent to your mail for you to verify
            your agency email. Please verify the email.
          </p>
        </div>
        <div className="space-y-2 rounded-[10px] border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Reviewing Account</h2>
            <p className="rounded-md bg-green-100 p-2 font-semibold text-green-600">
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
            className="mt-4 bg-primary-blackishGreen hover:bg-primary"
            asChild
          >
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
