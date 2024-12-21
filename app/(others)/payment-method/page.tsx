import Image from "next/image";
import Link from "next/link";

import CreditCardForm from "@/components/form/payment-method-form";
import ArrowLeft from "@/components/icons/arrow-left";
import Logo from "@/components/shared/logo";
import MaxWidthContainer from "@/components/shared/max-width-container";

const PaymentMethod = () => {
  return (
    <MaxWidthContainer className="h-full lg:h-screen">
      <div className="grid w-full grid-cols-12 gap-8">
        <div className=" col-span-12 hidden size-full items-end  justify-end lg:col-span-5 lg:flex">
          <Image
            src={
              "https://res.cloudinary.com/demw7uh0v/image/upload/v1720258605/golobe/6081538_qso39y.jpg"
            }
            className="size-full rounded-[30px] object-cover"
            width={616}
            height={816}
            alt="register image"
          />
        </div>
        <div className="col-span-12 flex size-full flex-col gap-20 lg:col-span-7 lg:px-20">
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
