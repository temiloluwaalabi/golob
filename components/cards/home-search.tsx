// @flow
import * as React from "react";

import { FlightSearchForm } from "../form/flight-search-form";
import AirplaceIcon from "../icons/airplane";
import StayIcon from "../icons/stay";
import ClientOnly from "../shared/client-only";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export const HomeSearch = () => {
  return (
    <Tabs
      defaultValue="flight"
      className="z-30 h-auto rounded-[16px] bg-white px-[20px] pb-8 pt-4 shadow-md lg:px-[32px] xxl:h-[280px]"
    >
      <TabsList className="mb-4 bg-transparent">
        <TabsTrigger
          className="!items-start rounded-none py-3 pl-1 pr-6 data-[state=active]:border-b-4 data-[state=active]:border-b-primary data-[state=active]:shadow-none"
          value="flight"
        >
          <p className="flex items-center gap-2">
            <AirplaceIcon />
            <span className="text-14_medium font-semibold">Flights</span>
          </p>
        </TabsTrigger>
        <Separator orientation={"vertical"} className="me-4 ms-4" />
        <TabsTrigger
          className="!items-start rounded-none py-3  pl-1 pr-6 data-[state=active]:border-b-4 data-[state=active]:border-b-primary data-[state=active]:shadow-none"
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
