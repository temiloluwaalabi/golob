// @flow
"use client";
import { RegisterSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import { FormFieldTypes } from "./login-form";
import { useRouter } from "next/navigation";
import CustomFormField from "@/widgets/custom-form-field";
import { Form } from "../ui/form";
import { CreateUser } from "@/app/actions/user.actions";
type Props = {};
export const AgencyPersonalInformation = (props: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });
  const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      CreateUser(values).then((data) => {
        if (data.error) {
          toast({
            title: "Error creating account",
            description: data.error,
            variant: "destructive",
          });
        }

        if (data.success) {
          toast({
            title: "User Registered Successfully",
            description: data.success,
          });

          form.reset();
          router.push("/auth/login");
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 ">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              disabled={isPending}
              control={form.control}
              name="firstName"
              inputType="text"
              label="First Name"
              labelClassName="bg-[#fcfcfc]"
              inputClassName="bg-red-900"
              placeholder="Enter your firstname"
            />
          </div>
          <div className="col-span-12">
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              disabled={isPending}
              control={form.control}
              name="lastName"
              inputType="text"
              label="Last Name"
              placeholder="Enter your lastname"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              disabled={isPending}
              control={form.control}
              name="email"
              inputType="email"
              label="Email"
              placeholder="Enter your email"
            />
          </div>
          <div className="col-span-12">
            <CustomFormField
              fieldType={FormFieldTypes.INPUT}
              disabled={isPending}
              control={form.control}
              name="number"
              inputType="number"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <CustomFormField
              fieldType={FormFieldTypes.PASSWORD}
              disabled={isPending}
              control={form.control}
              name="auth.password"
              labelClassName="bg-[#fcfcfc]"
              label="Password"
              passwordLabel="Password"
            />
          </div>
          <div className="col-span-12">
            <CustomFormField
              fieldType={FormFieldTypes.PASSWORD}
              disabled={isPending}
              control={form.control}
              labelClassName="bg-[#fcfcfc]"
              name="auth.confirmPassword"
              label="Confirm Password"
              passwordLabel="Confirm Password"
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
