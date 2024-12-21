"use client";
// @flow
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import * as React from "react";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import AppleIcon from "../icons/apple";
import FacebookIcon from "../icons/facebook";
import GoogleIcon from "../icons/google";
import { Button } from "../ui/button";
export const SocialLogin = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "apple" | "facebook") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <Button
        variant={"outline"}
        type="button"
        className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary p-6"
      >
        <FacebookIcon />
      </Button>
      <Button
        variant={"outline"}
        onClick={() => onClick("google")}
        className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary p-6"
      >
        <GoogleIcon />
      </Button>
      <Button
        variant={"outline"}
        className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary p-6"
      >
        <AppleIcon />
      </Button>
    </div>
  );
};
