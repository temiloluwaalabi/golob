"use client";
import { ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import * as React from "react";

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
import { cn } from "@/lib/utils";
import { User } from "@/types";
type Props = {
  dbUser: User | null;
};
export const MainDashboard = (props: Props) => {
  // const user = useCurrentUser();
  return (
    <MaxWidthContainer className="flex h-full flex-col">
      <BackgroundImageContainer
        boxClassName="relative h-[250px] lg:h-[350px] rounded-[12px] items-start md:items-end justify-end p-[25px]"
        image="https://res.cloudinary.com/demw7uh0v/image/upload/v1720525053/golobe/codioful-formerly-gradienta-QWutu2BRpOs-unsplash_oakhe1.jpg"
        overlayClassName="hidden"
      >
        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-[70%] flex-col  gap-6 md:-translate-y-1/2">
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
                <div className="flex size-8 items-center justify-center rounded-full bg-primary-salmon lg:size-11">
                  <PenIcon className="size-4 lg:size-6" />
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-center gap-2">
              <h4 className="font-mont text-lg font-semibold text-primary-blackishGreen lg:text-2xl">
                {props.dbUser?.name}
              </h4>
              <p className="font-mont text-sm font-normal lg:text-base">
                {props.dbUser?.email}
              </p>
            </div>
          </div>
        </div>
        <Button className="z-30 flex items-center gap-2 border-primary text-black hover:border">
          <UploadIcon />
          Upload new cover
        </Button>
      </BackgroundImageContainer>

      <div className="mt-[45%] xs:mt-[42%] sm:mt-[25%] md:mt-[20%] xl:mt-[12%]">
        <Tabs defaultValue="account" className="space-y-10">
          <TabsList className="flex h-[65px] items-center justify-between gap-3 rounded-[12px] bg-white p-0 px-6 shadow">
            <TabsTrigger
              value="account"
              className="group  flex  size-full items-center justify-start rounded-none p-0 data-[state=active]:shadow-none "
            >
              <span className=" flex h-full w-2/5 items-center font-mont text-sm font-semibold group-data-[state=active]:border-b-4 group-data-[state=active]:border-b-primary lg:text-base">
                Account
              </span>
            </TabsTrigger>
            <Separator
              orientation={"vertical"}
              className="h-[32px] bg-[#D7E2EE] lg:h-[48px]"
            />
            <TabsTrigger
              value="tickets"
              className="group   flex  size-full items-center justify-start rounded-none p-0 data-[state=active]:shadow-none "
            >
              <span className="h-fulltext-sm flex w-2/5 items-center font-mont font-semibold group-data-[state=active]:border-b-4 group-data-[state=active]:border-b-primary lg:text-base">
                Tickets/Bookings
              </span>
            </TabsTrigger>
            <Separator
              orientation={"vertical"}
              className="h-[32px] bg-[#D7E2EE] lg:h-[48px]"
            />
            <TabsTrigger
              value="payment-methods"
              className="group  flex  size-full items-center justify-start rounded-none p-0 data-[state=active]:shadow-none "
            >
              <span className="flex h-full w-2/5 items-center font-mont text-sm font-semibold group-data-[state=active]:border-b-4 group-data-[state=active]:border-b-primary lg:text-base">
                Payment
              </span>{" "}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="space-y-4">
              <h2 className="font-gothic text-2xl font-bold text-black lg:text-[32px]">
                Account
              </h2>
              <div className=" flex flex-col gap-8 rounded-[16px] px-6 py-8 shadow">
                <div className="flex flex-col  items-start justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <h5 className="mb-1 font-mont text-sm font-normal text-primary-blackishGreen opacity-75 lg:text-base">
                      Name
                    </h5>
                    <h3 className="font-mont text-base font-semibold text-primary-blackishGreen lg:text-xl">
                      {props.dbUser?.name}
                    </h3>
                  </div>
                  <div>
                    <Button
                      className="flex items-center gap-2 rounded-sm border-primary text-black"
                      variant={"outline"}
                    >
                      <UpdateIcon className="mr-2 size-4" />
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col  items-start justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <h5 className="mb-1 font-mont text-sm font-normal text-primary-blackishGreen opacity-75 lg:text-base">
                      Email
                    </h5>
                    <h3 className="font-mont text-base font-semibold text-primary-blackishGreen lg:text-xl">
                      {props.dbUser?.email}
                    </h3>
                  </div>
                  <div className="sm:tems-center flex flex-col items-start gap-2 sm:flex-row">
                    <Button
                      className="flex   items-center gap-2 rounded-sm border-primary text-black"
                      variant={"outline"}
                    >
                      <PlusIcon className="mr-2 size-4" />
                      Add another email
                    </Button>
                    <Button
                      className="flex items-center gap-2 rounded-sm border-primary text-black"
                      variant={"outline"}
                    >
                      <UpdateIcon className="mr-2 size-4" />
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col  items-start justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <h5 className="mb-1 font-mont text-sm font-normal text-primary-blackishGreen opacity-75 lg:text-base">
                      Paswword
                    </h5>
                    <h3 className="font-mont text-base font-semibold text-primary-blackishGreen lg:text-xl">
                      **********
                    </h3>
                  </div>
                  <div>
                    <Button
                      className="flex items-center gap-2 rounded-sm border-primary text-black"
                      variant={"outline"}
                    >
                      <UpdateIcon className="mr-2 size-4" />
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col  items-start justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <h5 className="mb-1 font-mont text-sm font-normal text-primary-blackishGreen opacity-75 lg:text-base">
                      Phone
                    </h5>
                    <h3 className="font-mont text-base font-semibold text-primary-blackishGreen lg:text-xl">
                      +234 81 29023 087
                    </h3>
                  </div>
                  <div>
                    <Button
                      className="flex items-center gap-2 rounded-sm border-primary text-black"
                      variant={"outline"}
                    >
                      <UpdateIcon className="mr-2 size-4" />
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col  items-start justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <h5 className="mb-1 font-mont text-sm font-normal text-primary-blackishGreen opacity-75 lg:text-base">
                      Address
                    </h5>
                    <h3 className="font-mont text-base font-semibold text-primary-blackishGreen lg:text-xl">
                      St 32 main downtown, Los Angeles, California, USA
                    </h3>
                  </div>
                  <div>
                    <Button
                      className="flex items-center gap-2 rounded-sm border-primary text-black"
                      variant={"outline"}
                    >
                      <UpdateIcon className="mr-2 size-4" />
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col  items-start justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <h5 className="mb-1 font-mont text-sm font-normal text-primary-blackishGreen opacity-75 lg:text-base">
                      Date of birth
                    </h5>
                    <h3 className="font-mont text-base font-semibold text-primary-blackishGreen lg:text-xl">
                      01-01-1992
                    </h3>
                  </div>
                  <div>
                    <Button
                      className="flex items-center gap-2 rounded-sm border-primary text-black"
                      variant={"outline"}
                    >
                      <UpdateIcon className="mr-2 size-4" />
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
                <h2 className="font-gothic text-2xl font-bold text-black lg:text-[32px]">
                  Tickets/Bookings
                </h2>
              </div>
              <Tabs defaultValue="flights" className="space-y-6">
                <TabsList className="grid h-fit grid-cols-2">
                  <TabsTrigger value="flights">
                    <div className="flex items-center gap-2 font-mont text-base font-semibold">
                      <AirplaceIcon className="mr-2 size-4" />
                      Flights
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="stays">
                    <div className="flex items-center gap-2 font-mont text-base font-semibold">
                      <StayIcon className="mr-2 size-4" />
                      Stays
                    </div>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="flights" className="space-y-4">
                  <div className=" flex flex-col justify-between gap-8 rounded-[16px] px-6 py-8 shadow xl:flex-row">
                    <div className="flex flex-col items-start lg:flex-row lg:items-center">
                      <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-8">
                        <div className="flex size-20 items-center justify-center rounded-[8px] border border-primary p-1">
                          <Image
                            src="https://res.cloudinary.com/demw7uh0v/image/upload/v1720559772/golobe/kisspng-dubai-airbus-a380-emirates-airline-logo-5adaedbb89d2d6_1_v5bkdv.png"
                            width={64}
                            height={45}
                            alt="TIcket"
                            className="h-[44.49px] w-[64px] object-cover"
                          />
                        </div>

                        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row  md:items-center">
                          <div className="flex items-center gap-4">
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Newark(EWR)
                              </h6>
                              <h2 className="font-mont text-xl font-semibold text-primary-blackishGreen">
                                Thur, Dec 8
                              </h2>
                            </div>
                            <Separator className="h-[2px] w-[20px] bg-primary-blackishGreen" />
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Newark(EWR)
                              </h6>
                              <h2 className="font-mont text-xl font-semibold text-primary-blackishGreen">
                                6:00 pm
                              </h2>
                            </div>
                          </div>
                          <Separator
                            orientation={"vertical"}
                            className="hidden h-[48px] bg-[#d7e222] lg:flex"
                          />
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <CalendarIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Date
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  12-11-22
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <GateIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Gate
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  A12
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Flight time
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  Newark (EWR)
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <SeatIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Seat no.
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  128
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button className="h-[48px] w-[152px] text-black hover:bg-primary-salmon">
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
                  <div className=" flex flex-col justify-between gap-8 rounded-[16px] px-6 py-8 shadow xl:flex-row">
                    <div className="flex flex-col items-start lg:flex-row lg:items-center">
                      <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-8">
                        <div className="flex size-20 items-center justify-center rounded-[8px] border border-primary">
                          <Image
                            src="https://res.cloudinary.com/demw7uh0v/image/upload/v1720559772/golobe/kisspng-dubai-airbus-a380-emirates-airline-logo-5adaedbb89d2d6_1_v5bkdv.png"
                            width={64}
                            height={45}
                            alt="TIcket"
                            className="h-[44.49px] w-[64px] object-cover"
                          />
                        </div>

                        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row  md:items-center">
                          <div className="flex items-center gap-4">
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Newark(EWR)
                              </h6>
                              <h2 className="font-mont text-xl font-semibold text-primary-blackishGreen">
                                Thur, Dec 8
                              </h2>
                            </div>
                            <Separator className="h-[2px] w-[20px] bg-primary-blackishGreen" />
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Newark(EWR)
                              </h6>
                              <h2 className="font-mont text-xl font-semibold text-primary-blackishGreen">
                                6:00 pm
                              </h2>
                            </div>
                          </div>
                          <Separator
                            orientation={"vertical"}
                            className="hidden h-[48px] bg-[#d7e222] lg:flex"
                          />
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <CalendarIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Date
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  12-11-22
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <GateIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Gate
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  A12
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Flight time
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  Newark (EWR)
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <SeatIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Seat no.
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  128
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button className="h-[48px] w-[152px] text-black hover:bg-primary-salmon">
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
                  <div className=" flex flex-col justify-between gap-8 rounded-[16px] px-6 py-8 shadow xl:flex-row">
                    <div className="flex flex-col items-start lg:flex-row lg:items-center">
                      <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-8">
                        <div className="flex size-20 items-center justify-center rounded-[8px] border border-primary">
                          <Image
                            src="https://res.cloudinary.com/demw7uh0v/image/upload/v1720559772/golobe/kisspng-dubai-airbus-a380-emirates-airline-logo-5adaedbb89d2d6_1_v5bkdv.png"
                            width={64}
                            height={45}
                            alt="TIcket"
                            className="h-[44.49px] w-[64px] object-cover"
                          />
                        </div>

                        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row  md:items-center">
                          <div className="flex items-center gap-4">
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Newark(EWR)
                              </h6>
                              <h2 className="font-mont text-xl font-semibold text-primary-blackishGreen">
                                Thur, Dec 8
                              </h2>
                            </div>
                            <Separator className="h-[2px] w-[20px] bg-primary-blackishGreen" />
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Newark(EWR)
                              </h6>
                              <h2 className="font-mont text-xl font-semibold text-primary-blackishGreen">
                                6:00 pm
                              </h2>
                            </div>
                          </div>
                          <Separator
                            orientation={"vertical"}
                            className="hidden h-[48px] bg-[#d7e222] lg:flex"
                          />
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <CalendarIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Date
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  12-11-22
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <GateIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Gate
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  A12
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Flight time
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  Newark (EWR)
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <SeatIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Seat no.
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  128
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button className="h-[48px] w-[152px] text-black hover:bg-primary-salmon">
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
                  <div className=" flex flex-col justify-between gap-8 rounded-[16px] px-6 py-8 shadow xl:flex-row">
                    <div className="flex flex-col items-start lg:flex-row lg:items-center">
                      <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-center">
                        <div className="flex size-20 items-center justify-center rounded-[8px] border border-primary">
                          <Image
                            src="https://res.cloudinary.com/demw7uh0v/image/upload/v1720564852/golobe/download_2_bw0o3q.png"
                            width={64}
                            height={45}
                            alt="TIcket"
                            className="h-[44.49px] w-[64px] object-cover"
                          />
                        </div>

                        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                          <div className="flex items-center gap-4">
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Check-In
                              </h6>
                              <h2 className="font-mont text-xl font-semibold text-primary-blackishGreen">
                                Thur, Dec 8
                              </h2>
                            </div>
                            <Separator className="h-[2px] w-[20px] bg-primary-blackishGreen" />
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Check Out
                              </h6>
                              <h2 className="font-mont text-xl font-semibold text-primary-blackishGreen">
                                Fri, Dec 9
                              </h2>
                            </div>
                          </div>
                          <Separator
                            orientation={"vertical"}
                            className="hidden h-[48px] bg-[#d7e222] lg:flex"
                          />
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Check-In time
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  12:00pm
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <GateIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Room no.
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  On arrival
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Check-out time
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  11:30am
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button className="h-[48px] w-[152px] text-black hover:bg-primary-salmon">
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
                  <div className=" flex flex-col justify-between gap-8 rounded-[16px] px-6 py-8 shadow xl:flex-row">
                    <div className="flex flex-col items-start lg:flex-row lg:items-center">
                      <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-center">
                        <div className="flex size-20 items-center justify-center rounded-[8px] border border-primary">
                          <Image
                            src="https://res.cloudinary.com/demw7uh0v/image/upload/v1720564852/golobe/download_2_bw0o3q.png"
                            width={64}
                            height={45}
                            alt="TIcket"
                            className="h-[44.49px] w-[64px] object-cover"
                          />
                        </div>

                        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row  md:items-center">
                          <div className="flex items-center gap-4">
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Check-In
                              </h6>
                              <h2 className="font-mont text-xl font-semibold text-primary-blackishGreen">
                                Thur, Dec 8
                              </h2>
                            </div>
                            <Separator className="h-[2px] w-[20px] bg-primary-blackishGreen" />
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Check Out
                              </h6>
                              <h2 className="font-mont text-xl font-semibold text-primary-blackishGreen">
                                Fri, Dec 9
                              </h2>
                            </div>
                          </div>
                          <Separator
                            orientation={"vertical"}
                            className="hidden h-[48px] bg-[#d7e222] lg:flex"
                          />
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Check-In time
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  12:00pm
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <GateIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Room no.
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  On arrival
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Check-out time
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  11:30am
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button className="h-[48px] w-[152px] text-black hover:bg-primary-salmon">
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
                  <div className=" flex flex-col justify-between gap-8 rounded-[16px] px-6 py-8 shadow xl:flex-row">
                    <div className="flex flex-col items-start lg:flex-row lg:items-center">
                      <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-center">
                        <div className="flex size-20 items-center justify-center rounded-[8px] border border-primary">
                          <Image
                            src="https://res.cloudinary.com/demw7uh0v/image/upload/v1720564852/golobe/download_2_bw0o3q.png"
                            width={64}
                            height={45}
                            alt="TIcket"
                            className="h-[44.49px] w-[64px] object-cover"
                          />
                        </div>

                        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row  md:items-center">
                          <div className="flex items-center gap-4">
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Check-In
                              </h6>
                              <h2 className="font-mont text-xl font-semibold text-primary-blackishGreen">
                                Thur, Dec 8
                              </h2>
                            </div>
                            <Separator className="h-[2px] w-[20px] bg-primary-blackishGreen" />
                            <div className="space-y-2">
                              <h6 className="font-mont text-base font-normal opacity-75">
                                Check Out
                              </h6>
                              <h2 className="font-mont text-xl font-semibold text-primary-blackishGreen">
                                Fri, Dec 9
                              </h2>
                            </div>
                          </div>
                          <Separator
                            orientation={"vertical"}
                            className="hidden h-[48px] bg-[#d7e222] lg:flex"
                          />
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Check-In time
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  12:00pm
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <GateIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Room no.
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  On arrival
                                </h2>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex size-8 items-center justify-center rounded-[4px] bg-[#EBF6F2]">
                                <ClockIcon />
                              </div>
                              <div>
                                <h6 className="font-mont text-xs font-semibold opacity-60">
                                  Check-out time
                                </h6>
                                <h2 className="font-mont text-base font-medium">
                                  11:30am
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button className="h-[48px] w-[152px] text-black hover:bg-primary-salmon">
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
                <h2 className="font-gothic text-2xl font-bold text-black lg:text-[32px]">
                  Payment methods
                </h2>
              </div>
              <div className=" flex flex-col justify-between gap-8 rounded-[16px] px-6 py-8 shadow lg:flex-row">
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <AtmCard />
                  </div>
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="flex h-[212px] w-full cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-primary p-4 shadow-none outline-none">
                          <div className="flex cursor-pointer flex-col items-center gap-[10px]">
                            <div className="flex size-10 items-center justify-center rounded-full border border-primary">
                              <Plus className="size-5 cursor-pointer text-primary" />
                            </div>
                            <p className="font-mont text-xs font-medium text-primary-blackishGreen opacity-75">
                              Add a new card
                            </p>
                          </div>
                        </Card>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="mb-[42px]">
                          <DialogTitle className="font-gothic text-4xl font-bold text-black">
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
