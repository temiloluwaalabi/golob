"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { VerifyCodeSchema } from "@/lib/validations";
import CustomPasswordInput from "@/widgets/password-widget";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

const VerfiyCode = () => {
  const form = useForm<z.infer<typeof VerifyCodeSchema>>({
    resolver: zodResolver(VerifyCodeSchema),
  });

  const handleSubmit = async (values: z.infer<typeof VerifyCodeSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-6">
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomPasswordInput
                    field={field}
                    label="Enter Code"
                    placeholder="Enter the code sent to your mail"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <p>
            <span>Didn&apos;t recieve a code?</span>{" "}
            <Link
              className="text-14_medium text-primary-salmon"
              href="/auth/forgot-password"
            >
              Resend
            </Link>
          </p>
          <div className="my-[14px] flex flex-col items-center space-y-6">
            <Button className="h-[48px] w-full rounded-md text-sm font-semibold text-primary-blackishGreen hover:bg-primary-blackishGreen hover:text-white">
              Verify
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default VerfiyCode;
