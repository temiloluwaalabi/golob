// @flow
"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AgencyPersonalInformation } from "../form/agency-forms";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  isLoading?: boolean;
};
export const AgencyInitialSteps = (props: Props) => {
  return (
    <Card className="border-none bg-transparent outline-none focus-visible:ring-0 focus-visible:!ring-offset-0 shadow-none p-0 flex flex-col h-full   gap-8">
      <CardHeader className="p-0">
        <CardTitle>
          <h3 className="text-xl font-bold">Verify your identity</h3>
        </CardTitle>
        <CardDescription>
          <p className="text-sm font-normal">
            Fill out these details to create your account
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <AgencyPersonalInformation />
      </CardContent>
      <CardFooter className="p-0  gap-4 mt-auto">
        <Button className="w-full h-[48px] bg-transparent border-2 border-primary rounded-md text-sm hover:bg-primary hover:text-white font-semibold text-primary-blackishGreen">
          <Loader
            className={cn(
              "animate-spin size-4 me-2 hidden",
              props.isLoading && "flex"
            )}
          />
          {props.isLoading ? "Saving Draft..." : "Save Draft"}
        </Button>
        <div></div>
        <Button className=" w-full h-[48px] rounded-md text-sm hover:bg-primary-blackishGreen hover:text-white font-semibold text-primary-blackishGreen">
          <Loader
            className={cn(
              "animate-spin size-4 me-2 hidden",
              props.isLoading && "flex"
            )}
          />
          {props.isLoading ? "Loading..." : "Next Step"}
        </Button>
      </CardFooter>
    </Card>
  );
};
