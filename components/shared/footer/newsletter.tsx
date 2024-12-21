// @flow
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmailSchema } from "@/lib/validations";

export const NewsLetter = () => {
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
  });

  const handleSubmit = async (values: z.infer<typeof EmailSchema>) => {
    console.log(values);
  };
  return (
    <div className="flex flex-col items-center justify-between rounded-[20px] bg-[#CDEAE1] px-[24px] shadow-md md:flex-row">
      <div className="flex flex-col gap-[10px] py-[24px] md:gap-[16px] lg:gap-[24px]">
        <h4 className="font-gothic text-2xl font-bold text-primary-blackishGreen md:text-3xl lg:text-5xl">
          Subscribe <br /> Newsletter
        </h4>
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-2">
            <h4 className="font-gothic text-[20px] font-bold leading-[25px] text-primary-blackishGreen opacity-80">
              The Travel
            </h4>
            <p className="max-w-[593px] font-mont text-base font-medium text-primary-blackishGreen opacity-70">
              Get inspired! Receive travel discounts, tips and behind the scenes
              stories.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex w-full flex-col items-start gap-2  md:flex-row md:items-center">
                      <Input
                        className="flex h-[40px] w-full rounded-[4px] border-none bg-white px-4 py-2 font-mono text-sm font-normal text-[#1c1b1f] outline-none md:h-[56px]"
                        type="email"
                        placeholder="Your email address"
                        {...field}
                      />
                      <Button
                        type="submit"
                        className="flex h-[40px] w-[104px] items-center justify-center gap-1 rounded-[4px] bg-primary-blackishGreen px-4 py-2 font-mont text-sm text-white md:h-[56px]"
                      >
                        Subscribe
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/demw7uh0v/image/upload/v1720189689/golobe/mail_thfxud.png"
          alt="Newsletter image"
          width={400}
          height={305}
          className="hidden h-[305px] w-[400px] object-cover md:flex"
        />
      </div>
    </div>
  );
};
