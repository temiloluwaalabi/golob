// @flow
"use client";
import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Account, User } from "@prisma/client";
import { Avatar, AvatarImage } from "../ui/avatar";
import { GithubIcon, MailIcon } from "lucide-react";
import { maskEmail } from "@/lib/utils";
import { Button } from "../ui/button";
import GoogleIcon from "../icons/google";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useCurrentAuthStore } from "@/store/authStore";

type Props = {
  user: User | null | undefined;
  account: Account | null | undefined;
};
export const AccountModalForm = ({ user, account }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("redirectTo") ?? DEFAULT_LOGIN_REDIRECT;
  const { setShowAccountForm } = useCurrentAuthStore();
  const handleClick = (
    provider: "google" | "github" | "facebook" | "apple"
  ) => {
    signIn(provider, {
      callbackUrl: callbackUrl,
    });
    // if (urlError) {
    //   toast({
    //     description: "Email already in use with different provide",
    //   });
    // }
  };
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col items-center justify-center gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="size-20">
                {user?.image && <AvatarImage src={user.image} />}
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>{user && user.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex items-center gap-2">
          <MailIcon />
          <p>{user && maskEmail(user.email as string)}</p>
        </div>
        {account?.provider === "google" && (
          <Button
            variant="outline"
            className="h-[48px] rounded-[8px] mt-4 shadow-none no-focus text-sm font-medium flex items-center justify-start outline-none w-full border border-secondary-textBlack"
            onClick={() => handleClick("google")}
          >
            <GoogleIcon className="size-6 mr-[30%] text-blue-800" />
            Continue with Google
          </Button>
        )}
        {account?.provider === "github" && (
          <Button
            variant="outline"
            className="h-[48px] rounded-[8px] shadow-none no-focus text-sm font-medium flex items-center justify-start outline-none w-full border border-secondary-textBlack"
            onClick={() => handleClick("github")}
          >
            <GithubIcon className="size-6 mr-[30%] text-blue-800" />
            Continue with Github
          </Button>
        )}
      </div>
      <div className="flex items-center mt-3">
        <span className="text-xs">Not you?</span>
        <Button
          className="p-0 ms-1 underline"
          variant="link"
          onClick={() => setShowAccountForm(false)}
        >
          Use another account
        </Button>
      </div>
    </div>
  );
};
