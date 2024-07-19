"use client";
import { AtmCard } from "@/components/cards/atm-card";
import CreditCardForm from "@/components/form/payment-method-form";
import AirplaceIcon from "@/components/icons/airplane";
import CalendarIcon from "@/components/icons/celendar";
import ClockIcon from "@/components/icons/clock";
import GateIcon from "@/components/icons/gate";
import PenIcon from "@/components/icons/pen";
import PlusIcon from "@/components/icons/plus";
import SeatIcon from "@/components/icons/seat";
import StayIcon from "@/components/icons/stay";
import UpdateIcon from "@/components/icons/update";
// @flow
import UploadIcon from "@/components/icons/upload";
import { BackgroundImageContainer } from "@/components/shared/background-image-container";
import MaxWidthContainer from "@/components/shared/max-width-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import * as React from "react";
type Props = {
  dbUser: User | null;
};
export const MainDashboard = (props: Props) => {
  // const user = useCurrentUser();
  return (
    <MaxWidthContainer className="h-full flex flex-col">
      <BackgroundImageContainer
        boxClassName="relative h-[250px] lg:h-[350px] rounded-[12px] items-start md:items-end justify-end p-[25px]"
        image="https://res.cloudinary.com/demw7uh0v/image/upload/v1720525053/golobe/codioful-formerly-gradienta-QWutu2BRpOs-unsplash_oakhe1.jpg"
        overlayClassName="hidden"
      >
        <div className="absolute flex flex-col gap-6 bottom-0 left-[50%] translate-y-[70%]  md:translate-y-[50%] translate-x-[-50%]">
          <div className="flex flex-col items-center">
            <div className="relative w-fit">
              <Avatar
                className={cn(
                  "!h-[90px]  w-[90px] !z-10 sm:!h-[160px] sm:w-[160px] !border-primary-salmon border-4 cursor-pointer "
                )}
              >
                {props.dbUser?.image && (
                  <AvatarImage
                    src={props.dbUser?.image}
                    className="!z-10 cursor-pointer"
                  />
                )}
                <AvatarFallback className="!z-10">CN</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 z-10">
                <div className="size-8 lg:size-11 rounded-full bg-primary-salmon flex items-center justify-center">
                  <PenIcon className="size-4 lg:size-6" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center mt-4">
              <h4 className="text-lg lg:text-2xl font-mont font-semibold text-primary-blackishGreen">
                {props.dbUser?.name}
              </h4>
              <p className="text-sm lg:text-base font-normal font-mont">
                {props.dbUser?.email}
              </p>
            </div>
          </div>
        </div>
        <Button className="flex items-center gap-2 z-30 text-black hover:border border-primary">
          <UploadIcon />
          Upload new cover
        </Button>
      </BackgroundImageContainer>

      <div className="mt-[45%] xs:mt-[42%] sm:mt-[25%] md:mt-[20%] xl:mt-[12%]">
        <Tabs defaultValue="account" className="space-y-10">
          <TabsList className="flex items-center justify-between gap-3 p-0 px-6 h-[65px] bg-white rounded-[12px] shadow">
            <TabsTrigger
              value="account"
              className="h-full  w-full  data-[state=active]:shadow-none rounded-none group flex items-center justify-start p-0 "
            >
              <span className=" text-sm lg:text-base font-semibold font-mont h-full flex items-center w-[40%] group-data-[state=active]:border-b-4 group-data-[state=active]:border-b-primary">
                Account
              </span>
            </TabsTrigger>
            <Separator
              orientation={"vertical"}
              className="h-[32px] lg:h-[48px] bg-[#D7E2EE]"
            />
            <TabsTrigger
              value="tickets"
              className="h-full   w-full  data-[state=active]:shadow-none rounded-none group flex items-center justify-start p-0 "
            >
              <span className="h-fulltext-sm lg:text-base font-semibold font-mont flex items-center w-[40%] group-data-[state=active]:border-b-4 group-data-[state=active]:border-b-primary">
                Tickets/Bookings
              </span>
            </TabsTrigger>
            <Separator
              orientation={"vertical"}
              className="h-[32px] lg:h-[48px] bg-[#D7E2EE]"
            />
            <TabsTrigger
              value="payment-methods"
              className="h-full  w-full  data-[state=active]:shadow-none rounded-none group flex items-center justify-start p-0 "
            >
              <span className="h-full text-sm lg:text-base font-semibold font-mont flex items-center w-[40%] group-data-[state=active]:border-b-4 group-data-[state=active]:border-b-primary">
                Payment
              </span>{" "}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-[32px] font-bold font-gothic text-black">
                Account
              </h2>
              <div className=" px-6 py-8 flex flex-col gap-8 rounded-[16px] shadow">
                <div className="flex flex-col  md:flex-row gap-3 items-start md:items-center justify-between">
                  <div>
                    <h5 className="text-sm mb-1 lg:text-base font-mont font-normal text-primary-blackishGreen opacity-75">
                      Name
                    </h5>
                    <h3 className="text-base lg:text-xl font-mont text-primary-blackishGreen font-semibold">
                      {props.dbUser?.name}
                    </h3>
                  </div>
                  <div>
                    <Button
                      className="flex items-center gap-2 text-black rounded-sm border-primary"
                      variant={"outline"}
                    >
                      <UpdateIcon className="size-4 mr-2" />
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col  md:flex-row gap-3 items-start md:items-center justify-between">
                  <div>
                    <h5 className="text-sm mb-1 lg:text-base font-mont font-normal text-primary-blackishGreen opacity-75">
                      Email
                    </h5>
                    <h3 className="text-base lg:text-xl font-mont text-primary-blackishGreen font-semibold">
                      {props.dbUser?.email}
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:tems-center gap-2">
                    <Button
                      className="flex   items-center gap-2 text-black rounded-sm border-primary"
                      variant={"outline"}
                    >
                      <PlusIcon className="size-4 mr-2" />
                      Add another email
                    </Button>
                    <Button
                      className="flex items-center gap-2 text-black rounded-sm border-primary"
                      variant={"outline"}
                    >
                      <UpdateIcon className="size-4 mr-2" />
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col  md:flex-row gap-3 items-start md:items-center justify-between">
                  <div>
                    <h5 className="text-sm mb-1 lg:text-base font-mont font-normal text-primary-blackishGreen opacity-75">
                      Paswword
                    </h5>
                    <h3 className="text-base lg:text-xl font-mont text-primary-blackishGreen font-semibold">
                      **********
                    </h3>
                  </div>
                  <div>
                    <Button
                      className="flex items-center gap-2 text-black rounded-sm border-primary"
                      variant={"outline"}
                    >
                      <UpdateIcon className="size-4 mr-2" />
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col  md:flex-row gap-3 items-start md:items-center justify-between">
                  <div>
                    <h5 className="text-sm mb-1 lg:text-base font-mont font-normal text-primary-blackishGreen opacity-75">
                      Phone
                    </h5>
                    <h3 className="text-base lg:text-xl font-mont text-primary-blackishGreen font-semibold">
                      +234 81 29023 087
                    </h3>
                  </div>
                  <div>
                    <Button
                      className="flex items-center gap-2 text-black rounded-sm border-primary"
                      variant={"outline"}
                    >
                      <UpdateIcon className="size-4 mr-2" />
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col  md:flex-row gap-3 items-start md:items-center justify-between">
                  <div>
                    <h5 className="text-sm mb-1 lg:text-base font-mont font-normal text-primary-blackishGreen opacity-75">
                      Address
                    </h5>
                    <h3 className="text-base lg:text-xl font-mont text-primary-blackishGreen font-semibold">
                      St 32 main downtown, Los Angeles, California, USA
                    </h3>
                  </div>
                  <div>
                    <Button
                      className="flex items-center gap-2 text-black rounded-sm border-primary"
                      variant={"outline"}
                    >
                      <UpdateIcon className="size-4 mr-2" />
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col  md:flex-row gap-3 items-start md:items-center justify-between">
                  <div>
                    <h5 className="text-sm mb-1 lg:text-base font-mont font-normal text-primary-blackishGreen opacity-75">
                      Date of birth
                    </h5>
                    <h3 className="text-base lg:text-xl font-mont text-primary-blackishGreen font-semibold">
                      01-01-1992
                    </h3>
                  </div>
                  <div>
                    <Button
                      className="flex items-center gap-2 text-black rounded-sm border-primary"
                      variant={"outline"}
                    >
                      <UpdateIcon className="size-4 mr-2" />
                      Change
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tickets">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl lg:text-[32px] font-bold font-gothic text-black">
                  Tickets/Bookings
                </h2>
              </div>
              <Tabs defaultValue="flights" className="space-y-6">
                <TabsList className="h-fit grid grid-cols-2">
                  <TabsTrigger value="flights">
                    <div className="flex items-center gap-2 text-base font-semibold font-mont">
                      <AirplaceIcon className="size-4 mr-2" />
                      Flights
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="stays">
                    <div className="flex items-center gap-2 text-base font-semibold font-mont">
                      <StayIcon className="size-4 mr-2" />
                      Stays
                    </div>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="flights" className="space-y-4">
                  <div className=" px-6 py-8 flex flex-col xl:flex-row justify-between gap-8 rounded-[16px] shadow">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 w-full">
                        <div className="size-20 rounded-[8px] border border-primary flex items-center justify-center p-1">
                          <Image
                            src="https://res.cloudinary.com/demw7uh0v/image/upload/v1720559772/golobe/kisspng-dubai-airbus-a380-emirates-airline-logo-5adaedbb89d2d6_1_v5bkdv.png"
                            width={64}
                            height={45}
                            alt="TIcket"
                            className="object-cover w-[64px] h-[44.49px]"
                          />
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between  w-full">
                          <div className="flex items-center gap-4">
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Newark(EWR)
                              </h6>
                              <h2 className="font-semibold text-xl font-mont text-primary-blackishGreen">
                                Thur, Dec 8
                              </h2>
                            </div>
                            <Separator className="w-[20px] h-[2px] bg-primary-blackishGreen" />
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Newark(EWR)
                              </h6>
                              <h2 className="font-semibold text-xl font-mont text-primary-blackishGreen">
                                6:00 pm
                              </h2>
                            </div>
                          </div>
                          <Separator
                            orientation={"vertical"}
                            className="h-[48px] bg-[#d7e222] hidden lg:flex"
                          />
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <CalendarIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Date
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  12-11-22
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <GateIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Gate
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  A12
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Flight time
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  Newark (EWR)
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <SeatIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Seat no.
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  128
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button className="w-[152px] h-[48px] hover:bg-primary-salmon text-black">
                        Download Ticket
                      </Button>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        className="size-12"
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className=" px-6 py-8 flex flex-col xl:flex-row justify-between gap-8 rounded-[16px] shadow">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 w-full">
                        <div className="size-20 rounded-[8px] border border-primary flex items-center justify-center">
                          <Image
                            src="https://res.cloudinary.com/demw7uh0v/image/upload/v1720559772/golobe/kisspng-dubai-airbus-a380-emirates-airline-logo-5adaedbb89d2d6_1_v5bkdv.png"
                            width={64}
                            height={45}
                            alt="TIcket"
                            className="object-cover w-[64px] h-[44.49px]"
                          />
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between  w-full">
                          <div className="flex items-center gap-4">
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Newark(EWR)
                              </h6>
                              <h2 className="font-semibold text-xl font-mont text-primary-blackishGreen">
                                Thur, Dec 8
                              </h2>
                            </div>
                            <Separator className="w-[20px] h-[2px] bg-primary-blackishGreen" />
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Newark(EWR)
                              </h6>
                              <h2 className="font-semibold text-xl font-mont text-primary-blackishGreen">
                                6:00 pm
                              </h2>
                            </div>
                          </div>
                          <Separator
                            orientation={"vertical"}
                            className="h-[48px] bg-[#d7e222] hidden lg:flex"
                          />
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <CalendarIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Date
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  12-11-22
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <GateIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Gate
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  A12
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Flight time
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  Newark (EWR)
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <SeatIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Seat no.
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  128
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button className="w-[152px] h-[48px] hover:bg-primary-salmon text-black">
                        Download Ticket
                      </Button>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        className="size-12"
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className=" px-6 py-8 flex flex-col xl:flex-row justify-between gap-8 rounded-[16px] shadow">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 w-full">
                        <div className="size-20 rounded-[8px] border border-primary flex items-center justify-center">
                          <Image
                            src="https://res.cloudinary.com/demw7uh0v/image/upload/v1720559772/golobe/kisspng-dubai-airbus-a380-emirates-airline-logo-5adaedbb89d2d6_1_v5bkdv.png"
                            width={64}
                            height={45}
                            alt="TIcket"
                            className="object-cover w-[64px] h-[44.49px]"
                          />
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between  w-full">
                          <div className="flex items-center gap-4">
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Newark(EWR)
                              </h6>
                              <h2 className="font-semibold text-xl font-mont text-primary-blackishGreen">
                                Thur, Dec 8
                              </h2>
                            </div>
                            <Separator className="w-[20px] h-[2px] bg-primary-blackishGreen" />
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Newark(EWR)
                              </h6>
                              <h2 className="font-semibold text-xl font-mont text-primary-blackishGreen">
                                6:00 pm
                              </h2>
                            </div>
                          </div>
                          <Separator
                            orientation={"vertical"}
                            className="h-[48px] bg-[#d7e222] hidden lg:flex"
                          />
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <CalendarIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Date
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  12-11-22
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <GateIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Gate
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  A12
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Flight time
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  Newark (EWR)
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <SeatIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Seat no.
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  128
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button className="w-[152px] h-[48px] hover:bg-primary-salmon text-black">
                        Download Ticket
                      </Button>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        className="size-12"
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="stays" className="space-y-4">
                  <div className=" px-6 py-8 flex flex-col xl:flex-row justify-between gap-8 rounded-[16px] shadow">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 w-full">
                        <div className="size-20 rounded-[8px] border border-primary flex items-center justify-center">
                          <Image
                            src="https://res.cloudinary.com/demw7uh0v/image/upload/v1720564852/golobe/download_2_bw0o3q.png"
                            width={64}
                            height={45}
                            alt="TIcket"
                            className="object-cover w-[64px] h-[44.49px]"
                          />
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-6 justify-between">
                          <div className="flex items-center gap-4">
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Check-In
                              </h6>
                              <h2 className="font-semibold text-xl font-mont text-primary-blackishGreen">
                                Thur, Dec 8
                              </h2>
                            </div>
                            <Separator className="w-[20px] h-[2px] bg-primary-blackishGreen" />
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Check Out
                              </h6>
                              <h2 className="font-semibold text-xl font-mont text-primary-blackishGreen">
                                Fri, Dec 9
                              </h2>
                            </div>
                          </div>
                          <Separator
                            orientation={"vertical"}
                            className="h-[48px] bg-[#d7e222] hidden lg:flex"
                          />
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Check-In time
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  12:00pm
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <GateIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Room no.
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  On arrival
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Check-out time
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  11:30am
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button className="w-[152px] h-[48px] hover:bg-primary-salmon text-black">
                        Download Ticket
                      </Button>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        className="size-12"
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className=" px-6 py-8 flex flex-col xl:flex-row justify-between gap-8 rounded-[16px] shadow">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 w-full">
                        <div className="size-20 rounded-[8px] border border-primary flex items-center justify-center">
                          <Image
                            src="https://res.cloudinary.com/demw7uh0v/image/upload/v1720564852/golobe/download_2_bw0o3q.png"
                            width={64}
                            height={45}
                            alt="TIcket"
                            className="object-cover w-[64px] h-[44.49px]"
                          />
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between  w-full">
                          <div className="flex items-center gap-4">
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Check-In
                              </h6>
                              <h2 className="font-semibold text-xl font-mont text-primary-blackishGreen">
                                Thur, Dec 8
                              </h2>
                            </div>
                            <Separator className="w-[20px] h-[2px] bg-primary-blackishGreen" />
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Check Out
                              </h6>
                              <h2 className="font-semibold text-xl font-mont text-primary-blackishGreen">
                                Fri, Dec 9
                              </h2>
                            </div>
                          </div>
                          <Separator
                            orientation={"vertical"}
                            className="h-[48px] bg-[#d7e222] hidden lg:flex"
                          />
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Check-In time
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  12:00pm
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <GateIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Room no.
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  On arrival
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Check-out time
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  11:30am
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button className="w-[152px] h-[48px] hover:bg-primary-salmon text-black">
                        Download Ticket
                      </Button>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        className="size-12"
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className=" px-6 py-8 flex flex-col xl:flex-row justify-between gap-8 rounded-[16px] shadow">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 w-full">
                        <div className="size-20 rounded-[8px] border border-primary flex items-center justify-center">
                          <Image
                            src="https://res.cloudinary.com/demw7uh0v/image/upload/v1720564852/golobe/download_2_bw0o3q.png"
                            width={64}
                            height={45}
                            alt="TIcket"
                            className="object-cover w-[64px] h-[44.49px]"
                          />
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between  w-full">
                          <div className="flex items-center gap-4">
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Check-In
                              </h6>
                              <h2 className="font-semibold text-xl font-mont text-primary-blackishGreen">
                                Thur, Dec 8
                              </h2>
                            </div>
                            <Separator className="w-[20px] h-[2px] bg-primary-blackishGreen" />
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Check Out
                              </h6>
                              <h2 className="font-semibold text-xl font-mont text-primary-blackishGreen">
                                Fri, Dec 9
                              </h2>
                            </div>
                          </div>
                          <Separator
                            orientation={"vertical"}
                            className="h-[48px] bg-[#d7e222] hidden lg:flex"
                          />
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Check-In time
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  12:00pm
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <GateIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Room no.
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  On arrival
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-8 rounded-[4px] bg-[#EBF6F2] flex items-center justify-center">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-semibold font-mont text-xs opacity-60">
                                  Check-out time
                                </h6>
                                <h2 className="text-base font-medium font-mont">
                                  11:30am
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button className="w-[152px] h-[48px] hover:bg-primary-salmon text-black">
                        Download Ticket
                      </Button>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        className="size-12"
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
          <TabsContent value="payment-methods">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl lg:text-[32px] font-bold font-gothic text-black">
                  Payment methods
                </h2>
              </div>
              <div className=" px-6 py-8 flex flex-col lg:flex-row justify-between gap-8 rounded-[16px] shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                  <div>
                    <AtmCard />
                  </div>
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="border-2 border-dashed border-primary shadow-none outline-none rounded-[16px] p-4 cursor-pointer h-[212px] flex-col w-full flex items-center justify-center">
                          <div className="flex flex-col gap-[10px] cursor-pointer items-center">
                            <div className="size-10 border border-primary rounded-full flex items-center justify-center">
                              <Plus className="size-5 text-primary cursor-pointer" />
                            </div>
                            <p className="text-xs font-medium font-mont opacity-75 text-primary-blackishGreen">
                              Add a new card
                            </p>
                          </div>
                        </Card>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="mb-[42px]">
                          <DialogTitle className="text-4xl font-bold font-gothic text-black">
                            Add a new Card
                          </DialogTitle>
                        </DialogHeader>
                        <CreditCardForm btnLabel="Add Card" />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MaxWidthContainer>
  );
};
