import Image from "next/image";

import RegisterForm from "@/components/form/register-form";
import Logo from "@/components/shared/logo";
import MaxWidthContainer from "@/components/shared/max-width-container";
import { SocialLogin } from "@/components/shared/social-login";

const RegisterPage = () => {
  return (
    <MaxWidthContainer className="h-full lg:h-screen">
      <div className="grid w-full grid-cols-12 gap-8">
        <div className=" col-span-12 hidden size-full items-end  justify-end lg:col-span-5 lg:flex">
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
        <div className="col-span-12 flex size-full flex-col gap-20 lg:col-span-7 lg:px-20">
          <Logo />
          <div className="flex flex-col gap-4">
            <div className="mb-10 space-y-4">
              <h4 className="text-large font-gothic text-primary-blackishGreen">
                Sign Up
              </h4>
              <p className="font-base">
                Let’s get you all st up so you can access your personal account.
              </p>
            </div>
            <div>
              <RegisterForm />
            </div>
            <div className="relative my-[40px] w-full">
              <p className="text-14_medium absolute left-1/2 top-1/2  z-10 -translate-x-1/2  -translate-y-1/2 bg-white  px-2 py-1 text-primary-blackishGreen">
                <span className="opacity-50">Or Sign up with</span>
              </p>
              <div className="h-[0.5px] w-full bg-primary-blackishGreen opacity-25" />
            </div>
            <SocialLogin />
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default RegisterPage;
