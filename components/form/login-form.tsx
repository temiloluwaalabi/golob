/* eslint-disable no-unused-vars */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { LoginByEmail } from "@/app/actions/user.actions";
import { getAccountByUserId, getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/lib/validations";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useAuthStore } from "@/store/authStore";
import CustomPasswordInput from "@/widgets/password-widget";

import AccountModal from "../cards/account-modal";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

export enum FormFieldTypes {
  INPUT = "input",
  POPOVER = " popover",
  INPUT_OTP = "inputOTP",
  TEXTAREA = "textarea",
  PASSWORD = "inputPassword",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const LoginForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null | undefined>();
  // const [showAccoumtForm, setShowAccoumtForm] = useState(false);
  const showAccountForm = useAuthStore((state) => state.showAccountForm);
  const setShowAccountForm = useAuthStore((state) => state.setShowAccountForm);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  // const urlError =
  //   searchParams.get("error") === "OAuthAccountNotLinked"
  //     ? "Email already in use with different provider"
  //     : "";

  const callbackUrl = searchParams.get("callbackUrl") ?? DEFAULT_LOGIN_REDIRECT;
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(async () => {
      const emailUser = await getUserByEmail(values.email);
      const accountExists = await getAccountByUserId(emailUser?.id as string);
      if (accountExists) {
        setUser(emailUser);
        setShowAccountForm(true);
        return;
      }
      LoginByEmail(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);

            // toast({
            //   title: "Error logging in",
            //   description: data.error,
            //   variant: "destructive",
            // });
          }
          if (data?.success) {
            toast({
              title: "Logged In Successfully",
              description: data?.success,
            });
            router.push(callbackUrl);
            router.refresh();
            form.reset();
          }
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Something went wrong",
          });
        });
    });
  };
  return (
    <>
      {showAccountForm && user ? (
        <AccountModal userId={user?.id} email={user?.email} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-6">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="relative flex h-[56px] items-center gap-1 rounded-md border bg-white p-0 pr-[10px] ">
                      <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Enter your Email"
                          type="email"
                          className="!border-none !bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomPasswordInput
                        field={field}
                        label="Password"
                        isPending={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <FormField
                  name="rememberMe"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <Checkbox
                          id="rememeberMe"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="rememberMe"
                        className="text-14_medium text-primary-blackishGreen"
                      >
                        Remember Me
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Button variant={"link"} disabled={isPending}>
                  <Link
                    href="/auth/forgot-password"
                    className="text-14_medium text-primary-salmon"
                  >
                    Forgot Password
                  </Link>
                </Button>
              </div>
              <div className="my-[14px] flex w-full flex-col items-center space-y-6">
                {error && (
                  <div className="flex w-full items-center gap-2 rounded-md bg-red-100 p-2">
                    <TriangleAlertIcon className="size-5 text-red-600" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                <Button
                  disabled={isPending}
                  className="h-[48px] w-full rounded-md text-sm font-semibold text-primary-blackishGreen hover:bg-primary-blackishGreen hover:text-white"
                >
                  {isPending ? "Logging...." : "Sign In"}
                </Button>
                <p className="text-14_medium flex items-center gap-1 text-center text-primary-blackishGreen">
                  <span>Don&apos;t have an account?</span>{" "}
                  <Button asChild variant={"ghost"} disabled={isPending}>
                    <Link href="/auth/sign-up" className="text-primary-salmon">
                      Sign up
                    </Link>
                  </Button>
                </p>
              </div>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default LoginForm;
