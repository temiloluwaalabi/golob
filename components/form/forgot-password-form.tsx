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
import CustomPasswordInput from "@/widgets/password-widget";

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
                <div className="flex gap-1 items-center p-0 relative bg-white pr-[10px] h-[56px] border rounded-md ">
                  <FormLabel className="absolute top-0 left-0 translate-x-3 mt-[-12px] bg-white px-2 py-1">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isPending}
                      placeholder="Enter your email"
                      type="email"
                      className="!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <div className="space-y-6 my-[14px] flex flex-col items-center">
            <Button className="w-full h-[48px] rounded-md text-sm hover:bg-primary-blackishGreen hover:text-white font-semibold text-primary-blackishGreen">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPassword;
