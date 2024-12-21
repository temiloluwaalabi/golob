// @flow
"use client";
import { Loader } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  isLoading?: boolean;
};
export const AgencyInitialSteps = (props: Props) => {
  return (
    <Card className="flex h-full flex-col gap-8 border-none bg-transparent p-0 shadow-none outline-none focus-visible:ring-0   focus-visible:!ring-offset-0">
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
        <h2>te</h2>
      </CardContent>
      <CardFooter className="mt-auto  gap-4 p-0">
        <Button className="h-[48px] w-full rounded-md border-2 border-primary bg-transparent text-sm font-semibold text-primary-blackishGreen hover:bg-primary hover:text-white">
          <Loader
            className={cn(
              "animate-spin size-4 me-2 hidden",
              props.isLoading && "flex"
            )}
          />
          {props.isLoading ? "Saving Draft..." : "Save Draft"}
        </Button>
        <div></div>
        <Button className=" h-[48px] w-full rounded-md text-sm font-semibold text-primary-blackishGreen hover:bg-primary-blackishGreen hover:text-white">
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
