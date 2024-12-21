"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { EmailSchema } from "@/lib/validations";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
  });

  const handleSubmit = async (values: z.infer<typeof EmailSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-6">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="">
                <div className="relative flex h-[56px] items-center gap-1 rounded-md border bg-white p-0 pr-[10px] ">
                  <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isPending}
                      placeholder="Enter your email"
                      type="email"
                      className="!border-none !bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <div className="my-[14px] flex flex-col items-center space-y-6">
            <Button className="h-[48px] w-full rounded-md text-sm font-semibold text-primary-blackishGreen hover:bg-primary-blackishGreen hover:text-white">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPassword;
