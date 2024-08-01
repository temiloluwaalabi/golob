"use client";
import React, {
  useState,
  useEffect,
  useTransition,
  useCallback,
  useMemo,
} from "react";
import { AgencyIdentityVerificationSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useRouter } from "next/navigation";
import CustomFormField from "@/widgets/custom-form-field";
import { CreateUser } from "@/app/actions/user.actions";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChevronRight, Loader, MailIcon } from "lucide-react";
import { cn, maskEmail } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { FormFieldTypes } from "@/components/form/login-form";
import { useAtom, useAtomValue } from "jotai";
import {
  initialPreOnboardingData,
  persoanlDetailsAtom,
  useAgencyPeOnboardingAtom,
} from "@/store/agency-pre-onboarding";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "@/types";
import { getUserByID } from "@/data/user";
import { currentUserAtom } from "@/store/authStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// @flow
type Props = {
  isLoading?: boolean;
};
export const AgencyPreOnboardingStepOne = (props: Props) => {
  const currentUser = useAtomValue(currentUserAtom);
  const [setLogin, setSetLogin] = useState(false);
  const pathname = usePathname();
  const [data, setData] = useAtom(persoanlDetailsAtom);
  const [clientUser, setClientUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();
  const { goToNextStep, setStep, step } = useAgencyPeOnboardingAtom();
  const router = useRouter();
  const { toast } = useToast();

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

  const handleSubmit = async (
    values: z.infer<typeof AgencyIdentityVerificationSchema>
  ) => {
    // console.log(values);

    startTransition(() => {
      CreateUser(values).then((data) => {
        if (data.error) {
          toast({
            title: "Error creating account",
            description: data.error,
            variant: "destructive",
          });
          router.push("/auth/login");
        }

        if (data.success) {
          toast({
            title: "User Registered Successfully",
            description:
              "A link to verify your email has been sent to your mail. Please verify your mail",
          });

          setData((prev) => ({
            ...prev,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.number,
            password: values.auth.password,
            confirmPassword: values.auth.confirmPassword,
          }));
          goToNextStep();
          // form.reset();
          // router.push("/auth/login");
        }
      });
    });
  };
  return (
    <Card className="border-none bg-transparent outline-none focus-visible:ring-0 focus-visible:!ring-offset-0 shadow-none p-0 flex flex-col justify-between h-full   gap-8">
      <CardHeader className="p-0">
        <CardTitle>
          <div className="flex justify-between items-center">
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
          <div className=" h-full flex items-center justify-center">
            <div className="shadow-none rounded-[10px] ring-2 ring-primary ring-offset-2 w-full  border flex flex-col items-center gap-4 p-5">
              <h2 className="text-base text-ellipsis font-bold text-center">
                Welcome Back, {currentUser ? currentUser.name : ""}
              </h2>
              <div className="flex-col flex items-center gap-2">
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
                className="hover:bg-primary-blackishGreen flex items-center"
              >
                Continue
                <ChevronRight className="size-4 ms-2" />
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
        <div className=" bg-white border p-4 rounded-[10px]  bg-transparent outline-none focus-visible:ring-0 focus-visible:!ring-offset-0 shadow-none flex flex-col h-fit justify-center  gap-8">
          <div className="p-0">
            <CardTitle>
              <div className="flex justify-between items-center">
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
          <div className="p-0 flex items-center gap-4 justify-between">
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
