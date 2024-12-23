/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Loader } from "lucide-react";
import React, { useState, useTransition } from "react";
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
import {
  allowedCountries,
  identificationDocuments,
  kycDocs,
} from "@/constants";
import { cn } from "@/lib/utils";
import { AgencyIdentityKYCSchema } from "@/lib/validations";
import {
  PreOnboardingData,
  useAgencyPeOnboardingAtom,
  verifyPersonalDetailsKYCAtom,
} from "@/store/agency-pre-onboarding";
import { CountryKYC, Document } from "@/types";
import CustomFormField from "@/widgets/custom-form-field";
// @flow
type Props = {
  isLoading?: boolean;
};
export const AgencyPreOnboardingStepTwo = (props: Props) => {
  const { goToNextStep } = useAgencyPeOnboardingAtom();
  const [data, setData] = useAtom(verifyPersonalDetailsKYCAtom);
  const [generalData, setGeneralData] = useAtom(PreOnboardingData);

  const [kycDocuments, setkycDocuments] = useState<CountryKYC | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AgencyIdentityKYCSchema>>({
    resolver: zodResolver(AgencyIdentityKYCSchema),
    defaultValues: {
      country: data.country || "",
      identificationNumber: data.identificationNumber || "",
      identificationType: data.identificationType || "",
      docUrl: data.docUrl.map((doc) => ({
        name: doc.name,
        url: doc.url,
        size: doc.size,
        key: doc.key || undefined,
      })),
    },
  });
  const uploadCOm = form
    .getValues("docUrl")
    .filter((item: any) => item.name && item.url && item.key);
  const handleDocumentChange = (documentName: string) => {
    // console.log(documentName);
    if (kycDocuments) {
      const documentData = kycDocuments.documents.personal.find(
        (doc: { name: string }) => doc.name.toLowerCase() === documentName
      );
      console.log(documentData);
      setSelectedDocument(documentData || null);
    }
  };
  const getKYCDocuments = (selectedCountry: string) => {
    setSelectedDocument(null);

    const country = allowedCountries.find(
      (country) => country.name.toLowerCase() === selectedCountry
    );

    if (!country) {
      throw new Error(`Country ${selectedCountry} is not allowed`);
    }

    const kycDocument = kycDocs.find(
      (doc) => doc.country.toLowerCase() === selectedCountry
    );

    if (!kycDocument) {
      throw new Error(`KYC documents for ${country.name} are not available`);
    }

    setkycDocuments(kycDocument);
    return kycDocument;
  };

  const handleSubmit = async (
    values: z.infer<typeof AgencyIdentityKYCSchema>
  ) => {
    startTransition(() => {
      goToNextStep();
      setData((prev) => ({
        ...prev,
        country: values.country,
        identificationNumber: values.identificationNumber,
        identificationType: values.identificationType,
        docUrl: values.docUrl
          .filter((item: any) => item.name && item.url && item.key)
          .map((doc) => ({
            ...doc,
            name: doc.name,
            size: doc.size,
            key: doc.key,
            url: doc.url,
          })),
      }));

      setGeneralData((prev) => ({
        ...prev,
        country: values.country,
        identificationNumber: values.identificationNumber,
        identificationType: values.identificationType,
        docUrl: uploadCOm.map((doc) => ({
          ...doc,
          name: doc.name,
          size: doc.size,
          key: doc.key,
          url: doc.url,
        })),
      }));
      // TODO: Verify Identification Number
      // CreateUser(values).then((data: { error: any; success: any; }) => {
      //   if (data.error) {
      //     toast({
      //       title: "Error creating account",
      //       description: data.error,
      //       variant: "destructive",
      //     });
      //   }
      //   if (data.success) {
      //     toast({
      //       title: "User Registered Successfully",
      //       description: data.success,
      //     });
      //     form.reset();
      //     router.push("/auth/login");
      //   }
      // });
    });
  };
  return (
    <Card className="flex h-full flex-col gap-8 border-none bg-transparent p-0 shadow-none outline-none focus-visible:ring-0   focus-visible:!ring-offset-0">
      <CardHeader className="p-0">
        <CardTitle>
          <h3 className="text-xl font-bold">Verify your identity - KYC</h3>
        </CardTitle>
        <CardDescription>
          <p className="text-sm font-normal">
            Fill and upload a valid means of identification
          </p>
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex h-full flex-col justify-between space-y-6"
        >
          <CardContent className="space-y-6 p-0">
            <div className="grid grid-cols-12 gap-4">
              <div
                className={cn(
                  "col-span-12",
                  (kycDocuments ||
                    form.getValues("identificationType") !== "") &&
                    " mmd:col-span-6"
                )}
              >
                <CustomFormField
                  fieldType={FormFieldTypes.SELECT}
                  disabled={isPending}
                  control={form.control}
                  name="country"
                  changeSelectValue={(value: string) => getKYCDocuments(value)}
                  label="Country"
                  placeholder="Select Country"
                >
                  {allowedCountries.map((doc, i) => (
                    <SelectItem
                      key={doc.id + i}
                      value={doc.name.toLowerCase()}
                      className="cursor-pointer"
                    >
                      {doc.name}
                    </SelectItem>
                  ))}
                </CustomFormField>
              </div>
              {(kycDocuments ||
                form.getValues("identificationType") !== "") && (
                <div className="col-span-12 mmd:col-span-6">
                  <CustomFormField
                    fieldType={FormFieldTypes.SELECT}
                    disabled={isPending}
                    control={form.control}
                    name="identificationType"
                    label="Identification Document"
                    changeSelectValue={(value: string) =>
                      handleDocumentChange(value)
                    }
                    placeholder="Select Document"
                  >
                    {!kycDocuments
                      ? identificationDocuments.map((doc: string, i: any) => (
                          <SelectItem
                            key={doc + i}
                            value={doc.toLowerCase()}
                            className="cursor-pointer"
                          >
                            {doc}
                          </SelectItem>
                        ))
                      : kycDocuments?.documents.personal.map(
                          (doc: { name: string }, i: any) => (
                            <SelectItem
                              key={doc.name + i}
                              value={doc.name.toLowerCase()}
                              className="cursor-pointer"
                            >
                              {doc.name}
                            </SelectItem>
                          )
                        )}
                  </CustomFormField>
                </div>
              )}
            </div>
            {(selectedDocument ||
              form.getValues("identificationNumber") !== "") && (
              <div className="col-span-12">
                <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  disabled={isPending}
                  control={form.control}
                  name="identificationNumber"
                  inputType="text"
                  label={selectedDocument?.fields[0].label}
                  placeholder={selectedDocument?.fields[0].placeholder}
                />
              </div>
            )}
            {(selectedDocument || uploadCOm.length > 0) && (
              <div className="col-span-12">
                <FormField
                  name="docUrl"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <UploadZone
                          fileNamePrefix={selectedDocument?.name || "identity"}
                          name={field.name}
                          form={form}
                          label={selectedDocument?.fields[1].label}
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
                {/* <CustomFormField
                  fieldType={FormFieldTypes.INPUT}
                  disabled={isPending}
                  control={form.control}
                  name="docUrl"
                  inputType="text"
                  label={selectedDocument?.fields[1].label}
                  placeholder={selectedDocument?.fields[1].placeholder}
                /> */}
              </div>
            )}
          </CardContent>
          <CardFooter className="mt-auto  gap-4 p-0">
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
