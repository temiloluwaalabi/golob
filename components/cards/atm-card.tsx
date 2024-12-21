// @flow
import * as React from "react";

import BinIcon from "../icons/bin";
import VisaIcon from "../icons/visa";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader } from "../ui/card";

export const AtmCard = () => {
  return (
    <Card className="flex h-[212px] w-full flex-col items-start justify-between rounded-[16px] border-none bg-primary p-4 shadow-none outline-none">
      <CardHeader className="w-full p-0">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-mont text-2xl font-semibold text-primary-blackishGreen">
              **** **** ****
            </span>
            <h2 className="mt-1 font-mont text-[32px] font-semibold text-primary-blackishGreen">
              4321
            </h2>
          </div>
          <Button variant={"ghost"} size={"icon"}>
            <BinIcon className="size-6" />
          </Button>
        </div>
      </CardHeader>
      <CardFooter className="flex w-full items-center justify-between p-0">
        <div>
          <h6 className="font-mont text-xs font-medium">Valid Thru</h6>
          <h2 className="font-mont text-xl font-semibold">02/27</h2>
        </div>
        <div>
          <VisaIcon />
        </div>
      </CardFooter>
    </Card>
  );
};
