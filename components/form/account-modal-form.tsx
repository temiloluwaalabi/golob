// @flow
"use client";
import { Account, User } from "@prisma/client";
import { GithubIcon, MailIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { maskEmail } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useAuthStore } from "@/store/authStore";

import GoogleIcon from "../icons/google";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type Props = {
  user: User | null | undefined;
  account: Account | null | undefined;
};
export const AccountModalForm = ({ user, account }: Props) => {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const callbackUrl = searchParams.get("redirectTo") ?? DEFAULT_LOGIN_REDIRECT;
  const setShowAccountForm = useAuthStore((state) => state.setShowAccountForm);

  const handleClick = (
    provider: "google" | "github" | "facebook" | "apple"
  ) => {
    signIn(provider, {
      callbackUrl,
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
            className="no-focus border-secondary-textBlack mt-4 flex h-[48px] w-full items-center justify-start rounded-[8px] border text-sm font-medium shadow-none outline-none"
            onClick={() => handleClick("google")}
          >
            <GoogleIcon className="mr-[30%] size-6 text-blue-800" />
            Continue with Google
          </Button>
        )}
        {account?.provider === "github" && (
          <Button
            variant="outline"
            className="no-focus border-secondary-textBlack flex h-[48px] w-full items-center justify-start rounded-[8px] border text-sm font-medium shadow-none outline-none"
            onClick={() => handleClick("github")}
          >
            <GithubIcon className="mr-[30%] size-6 text-blue-800" />
            Continue with Github
          </Button>
        )}
      </div>
      <div className="mt-3 flex items-center">
        <span className="text-xs">Not you?</span>
        <Button
          className="ms-1 p-0 underline"
          variant="link"
          onClick={() => setShowAccountForm(false)}
        >
          Use another account
        </Button>
      </div>
    </div>
  );
};
