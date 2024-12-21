import Image from "next/image";
import Link from "next/link";

import VerfiyCode from "@/components/form/verify-code-form";
import ArrowLeft from "@/components/icons/arrow-left";
import Logo from "@/components/shared/logo";
import MaxWidthContainer from "@/components/shared/max-width-container";

const VerifyCode = () => {
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

export default VerifyCode;
