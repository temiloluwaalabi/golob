"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { CheckCheckIcon, Loader, X } from "lucide-react";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  getAllAgencyPrefix,
  PreAgencyOnboardingAction,
} from "@/app/actions/agency.actions";
import { FormFieldTypes } from "@/components/form/login-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AgencyEssentialDetailsSchema } from "@/lib/validations";
import {
  agencyDetailsAtom,
  initialPreOnboardingData,
  PreOnboardingData,
  useAgencyPeOnboardingAtom,
} from "@/store/agency-pre-onboarding";
import CustomFormField from "@/widgets/custom-form-field";
// @flow

export const AgencyPreOnboardingStepThree = () => {
  const [data, setData] = useAtom(agencyDetailsAtom);
  const [loadingPrefix, setLoadingPrefix] = useState(false);
  const [prefixDbError, setprefixDbError] = useState(false);
  const [generalData, setGeneralData] = useAtom(PreOnboardingData);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { goToNextStep, goToPreviousStep } = useAgencyPeOnboardingAtom();
  const [generatedPrefix, setGeneratedPrefix] = useState<string[]>([]);
  const form = useForm<z.infer<typeof AgencyEssentialDetailsSchema>>({
    resolver: zodResolver(AgencyEssentialDetailsSchema),
    defaultValues: {
      agencyName: data.agencyName || "",
      agencyEmail: data.agencyEmail || "",
      agencyUniquePrefix: data.agencyUrl || "",
      natureOfBusiness: data.natureOfBusiness || "",
    },
  });

  const onGeneratePrefix = async () => {
    console.log("Use callback started");
    setGeneratedPrefix([]);
    const prefixes = await getAllAgencyPrefix();
    if (
      form.getValues("agencyName") === "" ||
      form.getValues("natureOfBusiness") === ""
    ) {
      toast({
        description: "Prompt cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setLoadingPrefix(true);

    const prompt = `Generate a list of prefix, 10 in number, the name of the agency is ${form.getValues(
      "agencyName"
    )}, this is their business description, ${form.getValues(
      "natureOfBusiness"
    )} I also have a list of all the prefix that has been stored in our database, this is it ${prefixes}, the prefix you are to generate should be unique and some of them can include the combination of the name of the agency and the word "agency". The result should be in json format please. `;

    try {
      const response = await fetch("api/google/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userPrompt: prompt,
        }),
      });
      const data = await response.json();
      setLoadingPrefix(false);

      if (data.text === "Unable to process the prompt. Please try again") {
        toast({
          description: "Unable to process the prompt. Please try again",
        });
        return;
      }

      console.log(data.text);

      setGeneratedPrefix(JSON.parse(data.text));
      console.log(generatedPrefix);
    } catch (error) {
      setLoadingPrefix(false);
      toast({
        description:
          "An error occurred while generating prefixes. Please try again.",
      });
      console.error(error); // Log error for debugging
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    setprefixDbError(false);
    if (e.key === "Enter") {
      e.preventDefault();

      const keyInput = e.target as HTMLInputElement;
      const inputValue = keyInput.value.trim();

      if (inputValue !== "") {
        const prefix = await getAllAgencyPrefix();
        console.log(prefix);
        if (prefix.length > 0) {
          const existingPrefix = prefix.find((prefix) => prefix === inputValue);
          if (existingPrefix) {
            setprefixDbError(true);
          }
        }
        onGeneratePrefix();
      }
    }
  };
  // useMemo(async () => {
  //   const prefixes = await getAllAgencyPrefix();

  //   if (
  //     form.getValues("agencyName") === "" ||
  //     form.getValues("natureOfBusiness") === ""
  //   ) {
  //     toast({
  //       description: "Prompt cannot be empty",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   setLoadingPrefix(true);

  //   const prompt = `Generate a list of prefix, 10 in number, the name of the agency is ${form.getValues(
  //     "agencyName"
  //   )}, this is their business description, ${form.getValues(
  //     "natureOfBusiness"
  //   )} I also have a list of all the prefix that has been stored in our database, this is it ${prefixes}, the prefix you are to generate should be unique and some of them can include the combination of the name of the agency and the word "agency" `;

  //   const response = await fetch("api/google/gemini", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userPrompt: prompt,
  //     }),
  //   });

  //   const data = await response.json();
  //   setLoadingPrefix(false);

  //   if (data.text === "Unable to process the prompt. Please try again") {
  //     toast({
  //       description: "Unable to process the prompt. Please try again",
  //     });
  //     return;
  //   }

  //   setGeneralData(data.text);
  //   console.log(generalData);
  // }, [form, generalData, setGeneralData, toast]);
  const handleSubmit = async (
    values: z.infer<typeof AgencyEssentialDetailsSchema>
  ) => {
    setData((prev) => ({
      ...prev,
      agencyName: values.agencyName,
      agencyEmail: values.agencyEmail,
      agencyUrl: values.agencyUniquePrefix,
      businessType: values.businessType,
      legalBusinessName: values.legalBusinessName,
      rcNumber: values.rcNumber,
      natureOfBusiness: values.natureOfBusiness,
    }));
    setGeneralData((prev) => ({
      ...prev,
      agencyName: values.agencyName,
      agencyEmail: values.agencyEmail,
      businessType: values.businessType,
      legalBusinessName: values.legalBusinessName,
      rcNumber: values.rcNumber,
      agencyUniquePrefix: values.agencyUniquePrefix,
      natureOfBusiness: values.natureOfBusiness,
    }));
    startTransition(() => {
      PreAgencyOnboardingAction({
        ...generalData,
        agencyName: values.agencyName,
        agencyEmail: values.agencyEmail,
        businessType: values.businessType,
        legalBusinessName: values.legalBusinessName,
        rcNumber: values.rcNumber,
        agencyUniquePrefix: values.agencyUniquePrefix,
        natureOfBusiness: values.natureOfBusiness,
      }).then((data) => {
        if (data.error) {
          toast({
            description: data.error,
            title: "Error creating agency",
          });
        }
        if (data.success) {
          toast({
            description: "Agency created successfully",
          });
          setGeneralData(initialPreOnboardingData);
          goToNextStep();
        }
      });
    });
    // TODO: Submit personal kyc details and create agency
    // TODO: Verify rcNumber
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
    <Card className="flex h-full flex-col gap-8 border-none bg-transparent p-0 shadow-none outline-none focus-visible:ring-0   focus-visible:!ring-offset-0">
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
          <CardContent className="space-y-6 p-0">
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
            <div className="grid grid-cols-12 gap-4">
              <div className={cn("col-span-12")}>
                <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  onInputKeyDown={(e) => handleKeyDown(e)}
                  disabled={isPending}
                  control={form.control}
                  name="agencyUniquePrefix"
                  formDescription="Click enter after inputing the desired prefix"
                  inputType="text"
                  label="Unique Prefix"
                  placeholder="Enter your desired prefix"
                >
                  <div className="">
                    {prefixDbError === true ? (
                      <X className="size-4" />
                    ) : (
                      <CheckCheckIcon className="size-4" />
                    )}

                    {/* <Button
                      className="py-2 px-1 border text-xs"
                      variant={"ghost"}
                      size={"sm"}
                    >
                      Check
                    </Button> */}
                  </div>
                </CustomFormField>
              </div>
              {loadingPrefix && generatedPrefix.length === 0 ? (
                <div className="col-span-12 flex flex-wrap items-center gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ske) => (
                    <Skeleton
                      className="h-5 w-24 rounded-md
                    "
                      key={ske}
                    />
                  ))}
                </div>
              ) : (
                <div className="col-span-12 flex flex-wrap items-center gap-2">
                  {generatedPrefix.length > 0 && (
                    <div className="col-span-12 mb-4 flex w-full flex-wrap items-center gap-2">
                      {generatedPrefix.map((pref) => (
                        <Badge
                          onClick={() =>
                            form.setValue("agencyUniquePrefix", pref)
                          }
                          className="cursor-pointer rounded-md bg-light-200 text-black hover:bg-primary-salmon"
                          key={pref}
                        >
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {/* {generatedPrefix.length > 0 && (
                <div className="col-span-12 mb-4 flex flex-wrap gap-2 items-center w-full">
                  {generatedPrefix.map((pref, i) => (
                    <Badge
                      onClick={() => form.setValue("agencyUniquePrefix", pref)}
                      className="bg-light-200 cursor-pointer hover:bg-primary-salmon text-black rounded-md"
                      key={pref}
                    >
                      {pref}
                    </Badge>
                  ))}
                </div>
              )} */}
              {prefixDbError === true && <span>This prefix is taken</span>}
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
          </CardContent>
          <CardFooter className="mt-auto  gap-4 p-0">
            <Button
              type="button"
              disabled={isPending}
              className="h-[48px] w-full rounded-md border-2 border-primary bg-transparent text-sm font-semibold text-primary-blackishGreen hover:bg-primary hover:text-white"
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
              className=" h-[48px] w-full rounded-md text-sm font-semibold text-primary-blackishGreen hover:bg-primary-blackishGreen hover:text-white"
            >
              <Loader
                className={cn(
                  "animate-spin size-4 me-2 hidden",
                  isPending && "flex"
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
