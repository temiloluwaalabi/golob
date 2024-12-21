/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom, useAtomValue } from "jotai";
import { ChevronRight, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { maskEmail } from "@/lib/utils";
import { AgencyIdentityVerificationSchema } from "@/lib/validations";
import {
  persoanlDetailsAtom,
  useAgencyPeOnboardingAtom,
} from "@/store/agency-pre-onboarding";
import { currentUserAtom } from "@/store/authStore";

// @flow

export const AgencyPreOnboardingStepOne = () => {
  const currentUser = useAtomValue(currentUserAtom);

  const [data, setData] = useAtom(persoanlDetailsAtom);
  // const [isPending, startTransition] = useTransition();
  const { goToNextStep } = useAgencyPeOnboardingAtom();
  const router = useRouter();

  const form = useForm<z.infer<typeof AgencyIdentityVerificationSchema>>({
    resolver: zodResolver(AgencyIdentityVerificationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      auth: {
        password: "",
        confirmPassword: "",
      },
    },
  });
  // Effect to update default values when currentUser or data changes
  useEffect(() => {
    form.reset({
      firstName: data.firstName || currentUser?.firstName || "",
      lastName: currentUser?.lastName || data.lastName || "",
      email: currentUser?.email || data.email || "",
      number: currentUser?.phoneNumber || data.phoneNumber || "",
      auth: {
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    });
  }, [currentUser, data, form]);

  // const handleSubmit = async (
  //   values: z.infer<typeof AgencyIdentityVerificationSchema>
  // ) => {
  //   // console.log(values);

  //   startTransition(() => {
  //     CreateUser(values).then((data) => {
  //       if (data.error) {
  //         toast({
  //           title: "Error creating account",
  //           description: data.error,
  //           variant: "destructive",
  //         });
  //         router.push("/auth/login");
  //       }

  //       if (data.success) {
  //         toast({
  //           title: "User Registered Successfully",
  //           description:
  //             "A link to verify your email has been sent to your mail. Please verify your mail",
  //         });

  //         setData((prev) => ({
  //           ...prev,
  //           firstName: values.firstName,
  //           lastName: values.lastName,
  //           email: values.email,
  //           phoneNumber: values.number,
  //           password: values.auth.password,
  //           confirmPassword: values.auth.confirmPassword,
  //         }));
  //         goToNextStep();
  //         // form.reset();
  //         // router.push("/auth/login");
  //       }
  //     });
  //   });
  // };
  return (
    <Card className="flex h-full flex-col justify-between gap-8 border-none bg-transparent p-0 shadow-none outline-none focus-visible:ring-0   focus-visible:!ring-offset-0">
      <CardHeader className="p-0">
        <CardTitle>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {currentUser?.id ? "Account Found" : "Create your Account"}
            </h3>
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
            {currentUser?.id
              ? "You already have an account with us, proceed to the next step"
              : "Fill out these details to create your account"}
          </p>
        </CardDescription>
      </CardHeader>
      {currentUser?.id ? (
        <>
          <div className=" flex h-full items-center justify-center">
            <div className="flex w-full flex-col items-center gap-4 rounded-[10px]  border p-5 shadow-none ring-2 ring-primary ring-offset-2">
              <h2 className="text-ellipsis text-center text-base font-bold">
                Welcome Back, {currentUser ? currentUser.name : ""}
              </h2>
              <div className="flex flex-col items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="size-20 ring-2 ring-primary ring-offset-2">
                        {currentUser?.image && (
                          <AvatarImage src={currentUser.image} />
                        )}
                        <AvatarFallback className="">CN</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      {currentUser && currentUser.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="flex items-center gap-2">
                  <MailIcon />
                  <p>{currentUser && maskEmail(currentUser.email as string)}</p>
                </div>
                {/* <AccountModalForm user={user} account={account} /> */}
              </div>
              <Button
                onClick={goToNextStep}
                className="flex items-center hover:bg-primary-blackishGreen"
              >
                Continue
                <ChevronRight className="ms-2 size-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        // <Form {...form}>
        //   <form
        //     onSubmit={form.handleSubmit(handleSubmit)}
        //     className="space-y-6 "
        //   >
        //     <CardContent className="p-0 space-y-6">
        //       <div className="grid grid-cols-12 gap-4">
        //         <div className="col-span-12">
        //           <CustomFormField
        //             fieldType={FormFieldTypes.INPUT}
        //             disabled={isPending}
        //             control={form.control}
        //             name="firstName"
        //             inputType="text"
        //             label="First Name"
        //             labelClassName="bg-[#fcfcfc]"
        //             inputClassName="bg-red-900"
        //             placeholder="Enter your firstname"
        //           />
        //         </div>
        //         <div className="col-span-12">
        //           <CustomFormField
        //             fieldType={FormFieldTypes.INPUT}
        //             disabled={isPending}
        //             control={form.control}
        //             name="lastName"
        //             inputType="text"
        //             label="Last Name"
        //             placeholder="Enter your lastname"
        //           />
        //         </div>
        //       </div>
        //       <div className="grid grid-cols-12 gap-4">
        //         <div className={cn("col-span-12")}>
        //           <CustomFormField
        //             fieldType={FormFieldTypes.INPUT}
        //             disabled={isPending}
        //             control={form.control}
        //             name="email"
        //             inputType="email"
        //             label="General Email"
        //             placeholder="Enter your email"
        //           />
        //         </div>
        //         <div className={cn("col-span-12")}>
        //           <CustomFormField
        //             fieldType={FormFieldTypes.INPUT}
        //             disabled={isPending}
        //             control={form.control}
        //             name="number"
        //             inputType="number"
        //             label="Phone Number"
        //             placeholder="Enter your phone number"
        //           />
        //         </div>
        //       </div>

        //       <div className="grid grid-cols-12 gap-4">
        //         <div className="col-span-12 ">
        //           <CustomFormField
        //             fieldType={FormFieldTypes.PASSWORD}
        //             disabled={isPending}
        //             control={form.control}
        //             name="auth.password"
        //             labelClassName="bg-[#fcfcfc]"
        //             label="Password"
        //             passwordLabel="Password"
        //           />
        //         </div>
        //         <div className="col-span-12 ">
        //           <CustomFormField
        //             fieldType={FormFieldTypes.PASSWORD}
        //             disabled={isPending}
        //             control={form.control}
        //             labelClassName="bg-[#fcfcfc]"
        //             name="auth.confirmPassword"
        //             label="Confirm Password"
        //             passwordLabel="Confirm Password"
        //           />
        //         </div>
        //       </div>
        //     </CardContent>
        //     <CardFooter className="p-0  gap-4 mt-auto ">
        //       {/* <Button
        //         className="w-full h-[48px] bg-transparent border-2 border-primary rounded-md text-sm hover:bg-primary hover:text-white font-semibold text-primary-blackishGreen"
        //         type="button"
        //       >
        //         <Loader
        //           className={cn(
        //             "animate-spin size-4 me-2 hidden",
        //             props.isLoading && "flex"
        //           )}
        //         />
        //         {props.isLoading ? "Saving Draft..." : "Save Draft"}
        //       </Button> */}
        //       <Button
        //         className=" w-fit h-[48px] rounded-md text-sm hover:bg-primary-blackishGreen hover:text-white font-semibold text-primary-blackishGreen ml-auto"
        //         type="submit"
        //       >
        //         <Loader
        //           className={cn(
        //             "animate-spin size-4 me-2 hidden",
        //             props.isLoading && "flex"
        //           )}
        //         />
        //         {props.isLoading ? "Loading..." : "Next Step"}
        //       </Button>
        //     </CardFooter>
        //   </form>
        // </Form>
        <div className=" flex h-fit flex-col justify-center  gap-8 rounded-[10px] border bg-white p-4 shadow-none outline-none focus-visible:ring-0  focus-visible:!ring-offset-0">
          <div className="p-0">
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
                You&apos;ve to be logged into your account to start the agency
                onboarding process, please visit the login page to access your
                account or the registration page to create your account
              </p>
            </CardDescription>
          </div>
          <div className="flex items-center justify-between gap-4 p-0">
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
          </div>
        </div>
      )}
    </Card>
  );
};
