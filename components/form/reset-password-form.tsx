"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { EmailSchema, LoginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { Button } from "../ui/button";
import { SetupPasswordCSchema } from "@/lib/common-validations";
import CustomPasswordInput from "@/widgets/password-widget";

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

          <div className="space-y-6 my-[14px] flex flex-col items-center">
            <Button className="w-full h-[48px] rounded-md text-sm hover:bg-primary-blackishGreen hover:text-white font-semibold text-primary-blackishGreen">
              Set Password
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
