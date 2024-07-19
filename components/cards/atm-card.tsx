// @flow
import * as React from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import BinIcon from "../icons/bin";
import VisaIcon from "../icons/visa";
type Props = {};
export const AtmCard = (props: Props) => {
  return (
    <Card className="bg-primary border-none shadow-none outline-none rounded-[16px] p-4 h-[212px] flex flex-col justify-between items-start w-full">
      <CardHeader className="p-0 w-full">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-2xl font-semibold font-mont text-primary-blackishGreen">
              **** **** ****
            </span>
            <h2 className="text-[32px] font-semibold font-mont text-primary-blackishGreen mt-1">
              4321
            </h2>
          </div>
          <Button variant={"ghost"} size={"icon"}>
            <BinIcon className="size-6" />
          </Button>
        </div>
      </CardHeader>
      <CardFooter className="p-0 flex items-center justify-between w-full">
        <div>
          <h6 className="text-xs font-mont font-medium">Valid Thru</h6>
          <h2 className="text-xl font-semibold font-mont">02/27</h2>
        </div>
        <div>
          <VisaIcon />
        </div>
      </CardFooter>
    </Card>
  );
};
