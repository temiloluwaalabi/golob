"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { VerifyCodeSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import CustomPasswordInput from "@/widgets/password-widget";

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
              className="text-primary-salmon text-14_medium"
              href="/auth/forgot-password"
            >
              Resend
            </Link>
          </p>
          <div className="space-y-6 my-[14px] flex flex-col items-center">
            <Button className="w-full h-[48px] rounded-md text-sm hover:bg-primary-blackishGreen hover:text-white font-semibold text-primary-blackishGreen">
              Verify
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default VerfiyCode;
