/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { FormFieldTypes } from "@/components/form/login-form";
import { ENDPOINTS } from "@/components/shared/upload-zone";
import UploadZone from "@/components/shared/upzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { AgencyIdentityAddressProof } from "@/lib/validations";
import {
  PreOnboardingData,
  useAgencyPeOnboardingAtom,
  verifyPersonalAddressAtom,
} from "@/store/agency-pre-onboarding";
import CustomFormField from "@/widgets/custom-form-field";
// @flow
type Props = {
  isLoading?: boolean;
};
export const AgencyPreOnboardingStepFour = (props: Props) => {
  const [data, setData] = useAtom(verifyPersonalAddressAtom);
  const [generalData, setGeneralData] = useAtom(PreOnboardingData);

  const [isPending, startTransition] = useTransition();
  const { goToNextStep, goToPreviousStep } = useAgencyPeOnboardingAtom();

  const form = useForm<z.infer<typeof AgencyIdentityAddressProof>>({
    resolver: zodResolver(AgencyIdentityAddressProof),
    defaultValues: {
      addressLineOne: data.addressLineOne || "",
      addressLineTwo: data.addressLineTwo || "",
      addressProofType: data.addressProofType || "",
      city: data.city || "",
      state: data.state || "",
      proofOfAddress: data.proofOfAddress || "",
    },
  });

  console.log(form.watch());
  const handleSubmit = async (
    values: z.infer<typeof AgencyIdentityAddressProof>
  ) => {
    setData((prev) => ({
      ...prev,
      addressLineOne: values.addressLineOne,
      addressLineTwo: values.addressLineTwo,
      city: values.city,
      state: values.state,
      addressProofType: values.addressProofType,
      proofOfAddress: values.proofOfAddress.map((doc) => ({
        ...doc,
        name: doc.name,
        size: doc.size,
        key: doc.key,
        url: doc.url,
      })),
    }));
    setGeneralData((prev) => ({
      ...prev,
      addressLineOne: values.addressLineOne,
      addressLineTwo: values.addressLineTwo,
      city: values.city,
      state: values.state,
      addressProofType: values.addressProofType,
      proofOfAddress: values.proofOfAddress
        .filter((item: any) => item.name && item.url && item.key)
        .map((doc) => ({
          ...doc,
          name: doc.name,
          size: doc.size,
          key: doc.key,
          url: doc.url,
        })),
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
    <Card className="flex h-full flex-col gap-8 border-none bg-transparent p-0 shadow-none outline-none focus-visible:ring-0   focus-visible:!ring-offset-0">
      <CardHeader className="p-0">
        <CardTitle>
          <h3 className="text-xl font-bold">Personal Address Verification</h3>
        </CardTitle>
        <CardDescription>
          <p className="text-sm font-normal">
            Fill out your home address details and upload a proof of address
          </p>
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 ">
          <CardContent className="space-y-6 p-0">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  disabled={isPending}
                  control={form.control}
                  name="addressLineOne"
                  inputType="text"
                  label="Address Line One"
                  labelClassName="bg-[#fcfcfc]"
                  placeholder="Enter yout street address"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className={cn("col-span-12")}>
                <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  disabled={isPending}
                  control={form.control}
                  name="addressLineTwo"
                  inputType="text"
                  label="Address Line Two"
                  placeholder="Enter yout street address - optional"
                />
              </div>
              <div className={cn("col-span-12")}>
                <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  disabled={isPending}
                  control={form.control}
                  name="city"
                  inputType="text"
                  label="City"
                  placeholder="City"
                />
              </div>
              <div className={cn("col-span-12")}>
                <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  disabled={isPending}
                  control={form.control}
                  name="state"
                  inputType="text"
                  label="State"
                  placeholder="State"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className={cn("col-span-12")}>
                <CustomFormField
                  fieldType={FormFieldTypes.SELECT}
                  disabled={isPending}
                  control={form.control}
                  name="addressProofType"
                  // changeSelectValue={(value: string) => getKYCDocuments(value)}
                  label="Proof Document"
                  placeholder="Select document Type"
                >
                  {[
                    "Utility Bill",
                    "Bank Statement",
                    "Tax Assessment",
                    "Letter from Government Authority",
                  ].map((doc, i) => (
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
              <div className="col-span-12">
                <FormField
                  name="proofOfAddress"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <UploadZone
                          fileNamePrefix="addressProof"
                          name={field.name}
                          form={form}
                          label="Proof of Address"
                          getValues={form.getValues}
                          setValue={form.setValue}
                          // disabled={isPending}
                          endpoint={ENDPOINTS.pdf}
                          // renderAs={"field"}
                          // maxFiles={4}
                          // isDialog={false}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
                  props.isLoading && "flex"
                )}
              />
              {isPending ? "Loading..." : "Next Step"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
