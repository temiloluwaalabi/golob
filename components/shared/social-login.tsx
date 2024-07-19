"use client";
// @flow
import * as React from "react";
import FacebookIcon from "../icons/facebook";
import GoogleIcon from "../icons/google";
import AppleIcon from "../icons/apple";
import { signIn } from "next-auth/react";

import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "../ui/button";
type Props = {};
export const SocialLogin = (props: Props) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "apple" | "facebook") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center gap-4 w-full justify-between">
      <Button
        variant={"outline"}
        type="button"
        className="border rounded-md cursor-pointer border-primary w-full flex items-center justify-center py-6 px-6"
      >
        <FacebookIcon />
      </Button>
      <Button
        variant={"outline"}
        onClick={() => onClick("google")}
        className="border rounded-md cursor-pointer border-primary w-full flex items-center justify-center py-6 px-6"
      >
        <GoogleIcon />
      </Button>
      <Button
        variant={"outline"}
        className="border rounded-md cursor-pointer border-primary w-full flex items-center justify-center py-6 px-6"
      >
        <AppleIcon />
      </Button>
    </div>
  );
};
