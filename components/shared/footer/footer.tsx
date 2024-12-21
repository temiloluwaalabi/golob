// @flow
"use client";
import { Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

import FacebookIcon from "@/components/icons/facebook";
import { footerLinks } from "@/constants";

import { NewsLetter } from "./newsletter";
import MaxWidthContainer from "../max-width-container";
import { FooterWidget } from "./footer-widget";
export const Footer = () => {
  const router = useRouter();
  return (
    <MaxWidthContainer className="relative mt-[12%] bg-primary">
      <div className="mt-[-15%] lg:mt-[-12%]">
        <NewsLetter />
      </div>
      <div className="mt-[64px] flex flex-col gap-10 pb-[64px] md:gap-[70px] lg:flex-row lg:gap-[140px]">
        <div className="flex flex-col gap-4 ">
          <Image
            src={
              "https://res.cloudinary.com/demw7uh0v/image/upload/v1720189709/golobe/footer-logo_eksdmh.png"
            }
            width={111}
            height={36}
            alt="Logo"
            className="cursor-pointer object-cover"
            onClick={() => router.push("/")}
          />
          <div className="flex items-center gap-2">
            <FacebookIcon className="me-2 size-5 text-primary-blackishGreen" />
            <Twitter className="me-2 size-5 text-primary-blackishGreen" />
            <Youtube className="me-2 size-5 text-primary-blackishGreen" />
            <Instagram className="me-2 size-5 text-primary-blackishGreen" />
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {footerLinks.map((link) => (
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
