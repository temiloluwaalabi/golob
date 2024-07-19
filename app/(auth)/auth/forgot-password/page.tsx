import ForgotPassword from "@/components/form/forgot-password-form";
import ArrowLeft from "@/components/icons/arrow-left";
import Logo from "@/components/shared/logo";
import MaxWidthContainer from "@/components/shared/max-width-container";
import { SocialLogin } from "@/components/shared/social-login";
import Image from "next/image";
import Link from "next/link";

const ForgotPasswordPage = () => {
  return (
    <MaxWidthContainer className="h-screen">
      <div className="flex flex-col w-full h-full lg:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-20 w-full h-full lg:pr-20">
          <Logo />
          <div className="flex flex-col gap-4">
            <div className="space-y-4 mb-10">
              <Link
                className="flex items-center gap-2 cursor-pointer"
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
            <div className="relative w-full my-[40px]">
              <p className="px-2 py-1 text-14_medium text-primary-blackishGreen  absolute top-[50%]  translate-y-[-50%] z-10  left-[50%] translate-x-[-50%] bg-white">
                <span className="opacity-50">Or login with</span>
              </p>
              <div className="w-full h-[0.5px] opacity-25 bg-primary-blackishGreen" />
            </div>
            <SocialLogin />
          </div>
        </div>
        <div className=" h-full w-full justify-end items-end hidden lg:flex">
          <Image
            src={
              "https://res.cloudinary.com/demw7uh0v/image/upload/v1720191455/golobe/xavier-coiffic-lQ4mfS5Le6M-unsplash_iytzom.jpg"
            }
            className="object-cover rounded-[30px] h-full w-full"
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
