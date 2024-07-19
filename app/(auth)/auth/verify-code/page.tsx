import ForgotPassword from "@/components/form/forgot-password-form";
import VerfiyCode from "@/components/form/verify-code-form";
import AppleIcon from "@/components/icons/apple";
import ArrowLeft from "@/components/icons/arrow-left";
import FacebookIcon from "@/components/icons/facebook";
import GoogleIcon from "@/components/icons/google";
import Logo from "@/components/shared/logo";
import MaxWidthContainer from "@/components/shared/max-width-container";
import Image from "next/image";
import Link from "next/link";

const VerifyCode = () => {
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
                Verify code
              </h4>
              <p className="font-base">
                An authentication code has been sent to your email.
              </p>
            </div>
            <div>
              <VerfiyCode />
            </div>
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

export default VerifyCode;
