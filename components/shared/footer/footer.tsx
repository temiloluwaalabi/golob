// @flow
"use client";
import * as React from "react";
import MaxWidthContainer from "../max-width-container";
import { NewsLetter } from "./newsletter";
import FacebookIcon from "@/components/icons/facebook";
import { Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { footerLinks } from "@/constants";
import { FooterWidget } from "./footer-widget";
type Props = {};
export const Footer = (props: Props) => {
  const router = useRouter();
  return (
    <MaxWidthContainer className="bg-primary relative mt-[12%]">
      <div className="mt-[-15%] lg:mt-[-12%]">
        <NewsLetter />
      </div>
      <div className="mt-[64px] pb-[64px] flex flex-col lg:flex-row gap-10 md:gap-[70px] lg:gap-[140px]">
        <div className="flex flex-col gap-4 ">
          <Image
            src={
              "https://res.cloudinary.com/demw7uh0v/image/upload/v1720189709/golobe/footer-logo_eksdmh.png"
            }
            width={111}
            height={36}
            alt="Logo"
            className="object-cover cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="flex items-center gap-2">
            <FacebookIcon className="size-5 text-primary-blackishGreen me-2" />
            <Twitter className="size-5 text-primary-blackishGreen me-2" />
            <Youtube className="size-5 text-primary-blackishGreen me-2" />
            <Instagram className="size-5 text-primary-blackishGreen me-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {footerLinks.map((link, i) => (
            <FooterWidget
              key={link.title}
              title={link.title}
              links={link.links}
            />
          ))}
        </div>
      </div>
    </MaxWidthContainer>
  );
};
