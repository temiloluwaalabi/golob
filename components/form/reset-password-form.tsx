"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { SetupPasswordCSchema } from "@/lib/common-validations";
import CustomPasswordInput from "@/widgets/password-widget";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof SetupPasswordCSchema>>({
    resolver: zodResolver(SetupPasswordCSchema),
  });

  const handleSubmit = async (values: z.infer<typeof SetupPasswordCSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-6">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomPasswordInput field={field} label="Create Password" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CustomPasswordInput
                    field={field}
                    label="Re-enter Password"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="my-[14px] flex flex-col items-center space-y-6">
            <Button className="h-[48px] w-full rounded-md text-sm font-semibold text-primary-blackishGreen hover:bg-primary-blackishGreen hover:text-white">
              Set Password
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
