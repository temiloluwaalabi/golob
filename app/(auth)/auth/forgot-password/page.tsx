import Image from "next/image";
import Link from "next/link";

import ForgotPassword from "@/components/form/forgot-password-form";
import ArrowLeft from "@/components/icons/arrow-left";
import Logo from "@/components/shared/logo";
import MaxWidthContainer from "@/components/shared/max-width-container";
import { SocialLogin } from "@/components/shared/social-login";

const ForgotPasswordPage = () => {
  return (
    <MaxWidthContainer className="h-screen">
      <div className="flex size-full flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="flex size-full flex-col gap-20 lg:pr-20">
          <Logo />
          <div className="flex flex-col gap-4">
            <div className="mb-10 space-y-4">
              <Link
                className="flex cursor-pointer items-center gap-2"
                href="/auth/login"
              >
                <ArrowLeft />
                <span>Back to login</span>
              </Link>
              <h4 className="text-large font-gothic text-primary-blackishGreen">
                Forgot your password?
              </h4>
              <p className="font-base">
                Don’t worry, happens to all of us. Enter your email below to
                recover your password
              </p>
            </div>
            <div>
              <ForgotPassword />
            </div>
            <div className="relative my-[40px] w-full">
              <p className="text-14_medium absolute left-1/2 top-1/2  z-10 -translate-x-1/2  -translate-y-1/2 bg-white  px-2 py-1 text-primary-blackishGreen">
                <span className="opacity-50">Or login with</span>
              </p>
              <div className="h-[0.5px] w-full bg-primary-blackishGreen opacity-25" />
            </div>
            <SocialLogin />
          </div>
        </div>
        <div className=" hidden size-full items-end justify-end lg:flex">
          <Image
            src={
              "https://res.cloudinary.com/demw7uh0v/image/upload/v1720191455/golobe/xavier-coiffic-lQ4mfS5Le6M-unsplash_iytzom.jpg"
            }
            className="size-full rounded-[30px] object-cover"
            width={616}
            height={816}
            alt="register image"
          />
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default ForgotPasswordPage;
