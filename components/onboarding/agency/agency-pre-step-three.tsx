"use client";
import React, { useState, useEffect, useTransition } from "react";
import { AgencyEssentialDetailsSchema } from "@/lib/validations";
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

import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { FormFieldTypes } from "@/components/form/login-form";
import { useAtom } from "jotai";
import {
  agencyDetailsAtom,
  persoanlDetailsAtom,
  useAgencyPeOnboardingAtom,
} from "@/store/agency-pre-onboarding";
import { SelectItem } from "@/components/ui/select";
// @flow
type Props = {
  isLoading?: boolean;
};
export const AgencyPreOnboardingStepThree = (props: Props) => {
  const pathname = usePathname();
  const [data, setData] = useAtom(agencyDetailsAtom);
  const [isPending, startTransition] = useTransition();
  const { goToNextStep, goToPreviousStep, setStep, step } =
    useAgencyPeOnboardingAtom();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof AgencyEssentialDetailsSchema>>({
    resolver: zodResolver(AgencyEssentialDetailsSchema),
    defaultValues: {
      agencyName: data.agencyName || "",
      agencyEmail: data.agencyEmail || "",
      agencyUniquePrefix: data.agencyUrl || "",
      natureOfBusiness: data.natureOfBusiness || "",
    },
  });
  console.log(form.watch());

  form.watch();
  const handleSubmit = async (
    values: z.infer<typeof AgencyEssentialDetailsSchema>
  ) => {
    // console.log(values);
    setData((prev) => ({
      ...prev,
      agencyName: values.agencyName,
      agencyEmail: values.agencyEmail,
      agencyUrl: values.agencyUniquePrefix,
      natureOfBusiness: values.natureOfBusiness,
    }));
    goToNextStep();
    // startTransition(() => {
    //   CreateUser(values).then((data) => {
    //     if (data.error) {
    //       toast({
    //         title: "Error creating account",
    //         description: data.error,
    //         variant: "destructive",
    //       });
    //     }

    //     if (data.success) {
    //       toast({
    //         title: "User Registered Successfully",
    //         description: data.success,
    //       });

    //       form.reset();
    //       router.push("/auth/login");
    //     }
    //   });
    // });
  };
  return (
    <Card className="border-none bg-transparent outline-none focus-visible:ring-0 focus-visible:!ring-offset-0 shadow-none p-0 flex flex-col h-full   gap-8">
      <CardHeader className="p-0">
        <CardTitle>
          <h3 className="text-xl font-bold">Agency Details</h3>
        </CardTitle>
        <CardDescription>
          <p className="text-sm font-normal">
            Fill out these basic agency details
          </p>
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 ">
          <CardContent className="p-0 space-y-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 mmd:col-span-6">
                <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  disabled={isPending}
                  control={form.control}
                  name="agencyName"
                  inputType="text"
                  label="Agency Name"
                  labelClassName="bg-[#fcfcfc]"
                  placeholder="Enter the name of your agency"
                />
              </div>
              <div className={cn("col-span-12 mmd:col-span-6")}>
                <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  disabled={isPending}
                  control={form.control}
                  name="agencyEmail"
                  inputType="email"
                  label="Agency Email"
                  placeholder="Enter your agency email"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className={cn("col-span-12")}>
                <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  disabled={isPending}
                  control={form.control}
                  name="agencyUniquePrefix"
                  inputType="text"
                  label="Unique Prefix"
                  placeholder="Enter your desired prefix"
                />
              </div>
              <div className={cn("col-span-12")}>
                <CustomFormField
                  fieldType={FormFieldTypes.SELECT}
                  disabled={isPending}
                  control={form.control}
                  name="businessType"
                  // changeSelectValue={(value: string) => getKYCDocuments(value)}
                  label="Business Type"
                  placeholder="Select Business Type"
                >
                  {["Registered Business", "Starter Business"].map((doc, i) => (
                    <SelectItem
                      key={doc + i}
                      value={doc.toLowerCase()}
                      className="cursor-pointer"
                    >
                      {doc}
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>
            </div>
            {form.getValues("businessType") === "registered business" && (
              <div className="grid grid-cols-12 gap-4">
                <div className={cn("col-span-12 mmd:col-span-6")}>
                  <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    disabled={isPending}
                    control={form.control}
                    name="legalBusinessName"
                    inputType="text"
                    label="Legal Business Name"
                    placeholder="Enter your legal business name"
                  />
                </div>
                <div className={cn("col-span-12 mmd:col-span-6")}>
                  <CustomFormField
                    fieldType={FormFieldTypes.INPUT}
                    disabled={isPending}
                    control={form.control}
                    name="rcNumber"
                    inputType="text"
                    label="Business Number (BN)"
                    placeholder="BN1234"
                  />
                </div>
              </div>
            )}
            <div className="grid grid-cols-12 gap-4">
              <div className={cn("col-span-12 h-full ")}>
                <CustomFormField
                  fieldType={FormFieldTypes.TEXTAREA}
                  disabled={isPending}
                  control={form.control}
                  name="natureOfBusiness"
                  inputType="text"
                  label="Nature of Business"
                  placeholder="Enter your business description"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-0  gap-4 mt-auto">
            <Button
              type="button"
              disabled={isPending}
              className="w-full h-[48px] bg-transparent border-2 border-primary rounded-md text-sm hover:bg-primary hover:text-white font-semibold text-primary-blackishGreen"
              onClick={goToPreviousStep}
            >
              {/* <Loader
                className={cn(
                  "animate-spin size-4 me-2 hidden",
                  props.isLoading && "flex"
                )}
              /> */}
              Back
            </Button>
            <div></div>
            <Button
              type="submit"
              disabled={isPending}
              className=" w-full h-[48px] rounded-md text-sm hover:bg-primary-blackishGreen hover:text-white font-semibold text-primary-blackishGreen"
            >
              <Loader
                className={cn(
                  "animate-spin size-4 me-2 hidden",
                  props.isLoading && "flex"
                )}
              />
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
