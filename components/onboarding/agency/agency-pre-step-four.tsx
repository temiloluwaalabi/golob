"use client";
import React, { useState, useEffect, useTransition } from "react";
import { AgencyIdentityAddressProof } from "@/lib/validations";
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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormFieldTypes } from "@/components/form/login-form";
import { useAtom } from "jotai";
import {
  agencyDetailsAtom,
  persoanlDetailsAtom,
  PreOnboardingData,
  useAgencyPeOnboardingAtom,
  verifyPersonalAddressAtom,
} from "@/store/agency-pre-onboarding";
import UploadZone from "@/components/shared/upzone";
import { ENDPOINTS } from "@/components/shared/upload-zone";
import { SelectItem } from "@/components/ui/select";
// @flow
type Props = {
  isLoading?: boolean;
};
export const AgencyPreOnboardingStepFour = (props: Props) => {
  const pathname = usePathname();
  const [data, setData] = useAtom(verifyPersonalAddressAtom);
  const [generalData, setGeneralData] = useAtom(PreOnboardingData);

  const [isPending, startTransition] = useTransition();
  const { goToNextStep, goToPreviousStep, setStep, step } =
    useAgencyPeOnboardingAtom();

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
    <Card className="border-none bg-transparent outline-none focus-visible:ring-0 focus-visible:!ring-offset-0 shadow-none p-0 flex flex-col h-full   gap-8">
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
          <CardContent className="p-0 space-y-6">
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
              {isPending ? "Loading..." : "Next Step"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
