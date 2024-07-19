import LoginForm from "@/components/form/login-form";
import CreditCardForm from "@/components/form/payment-method-form";
import RegisterForm from "@/components/form/register-form";
import AppleIcon from "@/components/icons/apple";
import ArrowLeft from "@/components/icons/arrow-left";
import EyeOffIcon from "@/components/icons/eye-off";
import FacebookIcon from "@/components/icons/facebook";
import GoogleIcon from "@/components/icons/google";
import Logo from "@/components/shared/logo";
import MaxWidthContainer from "@/components/shared/max-width-container";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const PaymentMethod = () => {
  return (
    <MaxWidthContainer className="h-full lg:h-screen">
      <div className="grid w-full grid-cols-12 gap-8">
        <div className=" h-full w-full justify-end items-end  col-span-12 hidden lg:flex lg:col-span-5">
          <Image
            src={
              "https://res.cloudinary.com/demw7uh0v/image/upload/v1720258605/golobe/6081538_qso39y.jpg"
            }
            className="object-cover rounded-[30px] h-full w-full"
            width={616}
            height={816}
            alt="register image"
          />
        </div>
        <div className="flex flex-col gap-20 w-full h-full col-span-12 lg:col-span-7 lg:px-20">
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
                Add a payment method
              </h4>
              <p className="font-base">
                Let’s get you all set up so you can access your personal
                account.
              </p>
            </div>
            <div>
              <CreditCardForm btnLabel="Add payment method" />
            </div>
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default PaymentMethod;
