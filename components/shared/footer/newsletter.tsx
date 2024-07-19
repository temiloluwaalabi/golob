// @flow
"use client";
import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { EmailSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
type Props = {};
export const NewsLetter = (props: Props) => {
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
  });

  const handleSubmit = async (values: z.infer<typeof EmailSchema>) => {
    console.log(values);
  };
  return (
    <div className="flex items-center flex-col md:flex-row justify-between px-[24px] shadow-md rounded-[20px] bg-[#CDEAE1]">
      <div className="py-[24px] flex flex-col gap-[10px] md:gap-[16px] lg:gap-[24px]">
        <h4 className="font-gothic text-2xl md:text-3xl lg:text-5xl font-bold text-primary-blackishGreen">
          Subscribe <br /> Newsletter
        </h4>
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-2">
            <h4 className="font-gothic text-[20px] leading-[25px] font-bold text-primary-blackishGreen opacity-80">
              The Travel
            </h4>
            <p className="font-mont font-medium text-base text-primary-blackishGreen max-w-[593px] opacity-70">
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
                    <div className="flex w-full flex-col md:flex-row items-start  md:items-center gap-2">
                      <Input
                        className="py-2 px-4 flex w-full h-[40px] md:h-[56px] rounded-[4px] outline-none border-none bg-white font-mono font-normal text-sm text-[#1c1b1f]"
                        type="email"
                        placeholder="Your email address"
                        {...field}
                      />
                      <Button
                        type="submit"
                        className="flex items-center justify-center w-[104px] h-[40px] md:h-[56px] gap-1 py-2 px-4 bg-primary-blackishGreen rounded-[4px] font-mont text-sm text-white"
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
          className="w-[400px] h-[305px] object-cover hidden md:flex"
        />
      </div>
    </div>
  );
};
