// @flow
import * as React from "react";
import { Card, CardHeader } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import AirplaceIcon from "../icons/airplane";
import StayIcon from "../icons/stay";
import { FlightSearchForm } from "../form/flight-search-form";
import ClientOnly from "../shared/client-only";
type Props = {};
export const HomeSearch = (props: Props) => {
  return (
    <Tabs
      defaultValue="flight"
      className="rounded-[16px] h-auto xxl:h-[280px] z-30 shadow-md bg-white px-[20px] lg:px-[32px] pt-4 pb-8"
    >
      <TabsList className="bg-transparent mb-4">
        <TabsTrigger
          className="py-3 !items-start pr-6 pl-1 data-[state=active]:shadow-none rounded-none data-[state=active]:border-b-[4px] data-[state=active]:border-b-primary"
          value="flight"
        >
          <p className="flex items-center gap-2">
            <AirplaceIcon />
            <span className="text-14_medium font-semibold">Flights</span>
          </p>
        </TabsTrigger>
        <Separator orientation={"vertical"} className="ms-4 me-4" />
        <TabsTrigger
          className="py-3 !items-start pr-6  pl-1 data-[state=active]:shadow-none rounded-none data-[state=active]:border-b-[4px] data-[state=active]:border-b-primary"
          value="stay"
        >
          <p className="flex items-center gap-2">
            <StayIcon />
            <span className="text-14_medium font-semibold">Stays</span>
          </p>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="flight">
        <div className="py-3 lg:py-6">
          <ClientOnly>
            <FlightSearchForm />
          </ClientOnly>
        </div>
      </TabsContent>
      <TabsContent value="stay">
        <div className="py-6">
          <h3>Stays</h3>
        </div>
      </TabsContent>
    </Tabs>
  );
};
