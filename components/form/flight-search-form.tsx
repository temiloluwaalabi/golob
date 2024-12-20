// @flow
"use client";
import * as React from "react";
import { useState } from "react";
import * as z from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { FligthSearchSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeftRight, CalendarIcon, Plus, Search, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cabinWay, countriesDest, tripWay } from "@/constants";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import Counter from "../shared/counter";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { RegionCountry } from "@/types";
import statesData from "@/constants/states.json"; // Import your states.json
import { Airport } from "@prisma/client";
import { api } from "@/lib/api";
import { toast } from "sonner";
const continents = [
  { name: "Africa", code: "AF", countries: ["NG", "GH", "KE", "ZA"] }, // Example popular countries (country codes)
  { name: "Asia", code: "AS", countries: ["CN", "IN", "JP", "KR"] },
  { name: "Europe", code: "EU", countries: ["GB", "FR", "DE", "IT"] },
  { name: "North America", code: "NA", countries: ["US", "CA", "MX", null] }, // Example, replace with actual data

  // ... other continents
];
type Props = {
  countries: RegionCountry[];
};
export const FlightSearchForm = (props: Props) => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const [isPending, startTransition] = React.useTransition();

  const [tripWayType, setTripWayType] = useState("round-trip");
  const [flightClass, setFlightClass] = useState("");
  const [openLeavingFrom, setOpenLeavingFrom] = useState(false);
  const [openGoingTo, setOpenGoingTo] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [openPassengers, setOpenPassengers] = useState(false);
  const [openDateCalendar, setOpenDateCalendar] = useState(false);
  const [openFlightClass, setOpenFlightClass] = useState(false);

  const [openTripWay, setOpenTripWay] = useState(false);
  const [adultCount, setAdultCount] = useState(0);
  const [totalPassengers, settotalPassengers] = useState(0);

  const [teenagersCount, setTeenagersCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);
  const [agedCount, setAgedCount] = useState(0);

  const [takeOffAirport, setTakeOffAirport] = useState<Partial<Airport[]>>();

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const form = useForm<z.infer<typeof FligthSearchSchema>>({
    resolver: zodResolver(FligthSearchSchema),
    defaultValues: {
      passengers: {
        adults: adultCount,
        teenagers: teenagersCount,
        infants: infantsCount,
      },
    },
  });
  React.useMemo(() => {
    settotalPassengers(adultCount + teenagersCount + infantsCount);
  }, [adultCount, infantsCount, teenagersCount]);

  console.log(adultCount);

  const handleCityClick = async (name: any, value: string) => {
    form.setValue(name, value);
  };
  const handleSwapCities = async (
    takeOffCity: any,
    destinationCity: string
  ) => {
    form.setValue("takeOff", destinationCity);
    form.setValue("destination", takeOffCity);
  };
  const handleSubmit = async (values: z.infer<typeof FligthSearchSchema>) => {
    console.log(values);
  };

  React.useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Use a reverse geocoding API to get location details (city, country, etc.)
            try {
              const response = await fetch(
                `/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
              );
              if (!response.ok) {
                throw new Error("Failed to fetch city");
              }
              const data = await response.json();
              console.log(data);
              setCurrentLocation(data.data);
              setError(null);
            } catch (err) {
              setError((err as Error).message);
            }

            // fetch(
            //   `/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
            // )
            //   .then((res) => res.json())
            //   .then((data) => {
            //     // Example: extract city/town or village name
            //     const city = data.city
            //     setCurrentLocation(city || "Unknown Location");
            //   })
            //   .catch((error) => {
            //     console.error("Error getting location:", error);
            //     setCurrentLocation("Unknown Location");
            //   });
          }
          // (error) => {
          //   console.error("Error getting location:", error);
          //   setCurrentLocation("Location access denied."); // Or handle the error as you see fit
          // }
        );
      } else {
        setCurrentLocation("Geolocation not supported by browser.");
      }
    };

    getCurrentLocation(); // Call the function initially
  }, []); // Empty dependency array means this effect runs only once (on mount)

  const filteredStates = searchQuery
    ? statesData.filter((state) =>
        state.country_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredCountries =
    filteredStates.length > 0
      ? [...new Set(filteredStates.map((state) => state.country_name))]
      : [];

  const getPopularStates = (continentCode: string) => {
    const continent = continents.find((c) => c.code === continentCode);

    if (!continent) {
      return []; // Handle case where continent is not found
    }

    let popularStates: any[] = [];

    continent.countries.forEach((countryCode) => {
      if (countryCode) {
        // Check if countryCode is not null (e.g., for North America)
        const countryStates = statesData.filter(
          (state) => state.country_code === countryCode
        );
        const numPopularStates = Math.min(3, countryStates.length); // Get at most 3 popular states per country
        const selectedStates = countryStates.slice(0, numPopularStates);
        popularStates = popularStates.concat(selectedStates);
      }
    });

    return popularStates;
  };
  const takeOff = form.watch("takeOff");

  const fetchAiportsBySearchTerm = React.useCallback(async () => {
    if (!takeOff || typeof takeOff !== "string" || takeOff.trim() === "") {
      return;
    }
    const airports = await api.airports.getAll(takeOff);
    console.log(airports);

    if (airports.error) {
      toast(airports.error.message);
    }

    if (airports.success && airports.data) {
      console.log(airports.data);
      setTakeOffAirport(airports.data);
    }
  }, [form.watch("takeOff")]);

  console.log(takeOffAirport);
  React.useEffect(() => {
    fetchAiportsBySearchTerm();
  }, [fetchAiportsBySearchTerm]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4 lg:gap-8 items-end"
      >
        <div>
          {takeOffAirport?.map((airport) => (
            <h2>{airport?.municipalityName}</h2>
          ))}
        </div>
        <div className="gap-4 grid grid-cols-12 w-full">
          <div className="flex flex-col md:flex-row gap-4 md:gap-3 relative  col-span-12 md:col-span-8 xxl:col-span-5">
            <FormField
              name="takeOff"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <Popover
                    open={openLeavingFrom}
                    onOpenChange={setOpenLeavingFrom}
                  >
                    <PopoverTrigger className="w-full">
                      <div
                        className={cn(
                          " flex gap-1 cursor-pointer items-center p-0 pl-2 pt-1 relative bg-white pr-[10px] h-[56px] border rounded-md ",
                          openLeavingFrom && "border-b-[3px] border-b-primary"
                        )}
                      >
                        <FormLabel className="absolute top-0 left-0 translate-x-3 mt-[-12px] bg-white px-2 py-1 text-sm font-mont font-normal">
                          Leaving From
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            placeholder="Leaving From"
                            type="text"
                            className="!bg-transparent cursor-pointer !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-base font-mont font-normal"
                            {...field}
                          />
                        </FormControl>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      align={"start"}
                      side={"bottom"}
                      sideOffset={3}
                      className="w-full max-w-[245px]  xs:max-w-[350px] sm:max-w-[350px] md:max-w-[420px] lg:max-w-[650px] p-0 my-3"
                    >
                      <div className="p-2">
                        <div className="relative flex h-12 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors">
                          <Search className="mr-2 size-4 shrink-0  opacity-50" />

                          <Input
                            placeholder="Leaving From..."
                            value={searchQuery}
                            onChange={(e) => {
                              e.preventDefault();
                              setSearchQuery(e.target.value);
                            }}
                            className="no-focus h-10 border-none p-0 shadow-none outline-none"
                          />
                        </div>
                      </div>
                      <ScrollArea className="h-[350px] md:h-[420px] lg:h-[500px]">
                        {searchQuery && filteredCountries.length > 0 ? (
                          filteredCountries.map((country_name) => (
                            <Card
                              key={country_name}
                              className="p-0 border-none shadow-none"
                            >
                              <CardHeader className="bg-light-800 text-14_medium font-medium text-primary-blackishGreen/40 p-0 py-2 px-3">
                                {country_name}
                              </CardHeader>
                              <CardContent className="p-0 px-2 py-2">
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                                  {filteredStates
                                    .filter(
                                      (s) => s.country_name === country_name
                                    )

                                    .map((city) => (
                                      <Badge // Use Badge or any suitable component
                                        key={city.id}
                                        onClick={() =>
                                          form.setValue("takeOff", city.name)
                                        } // Pass the field name
                                        className="bg-light-700 font-light cursor-pointer hover:bg-light-800 text-black/80 rounded-md px-5 py-2 m-2"
                                      >
                                        {city.name}
                                      </Badge>
                                    ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <>
                            <div className="px-3 pb-2">
                              {currentLocation ? (
                                <p>Current Location: {currentLocation}</p>
                              ) : (
                                <p>Getting current location...</p>
                              )}
                            </div>
                            {/* Replace with actual current location */}
                            {continents.map((country, i) => (
                              <Card
                                key={country.code}
                                className="p-0 border-none shadow-none"
                              >
                                <CardHeader className="bg-light-800 text-14_medium font-medium text-primary-blackishGreen/40 p-0 py-2 px-3">
                                  {country.name}
                                </CardHeader>
                                <CardContent className="p-0 px-3 py-6">
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                                    {getPopularStates(country.code).map(
                                      (city) => (
                                        <Badge
                                          className="bg-light-700 font-light cursor-pointer hover:bg-light-800 text-black/80 rounded-md px-5 py-2 "
                                          key={city.id}
                                          onClick={() => {
                                            handleCityClick(
                                              field.name,
                                              city.name
                                            );
                                            setOpenLeavingFrom(false);
                                          }}
                                        >
                                          {city.name}
                                        </Badge>
                                      )
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </>
                        )}

                        <ScrollBar orientation={"vertical"} />
                      </ScrollArea>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <Button
              onClick={() =>
                handleSwapCities(
                  form.getValues("takeOff"),
                  form.getValues("destination")
                )
              }
              type="button"
              className="p-2 rounded-full rotate-90 md:rotate-0 absolute bg-light-700 hover:bg-light-800 h-auto translate-y-[-50%] top-[50%] left-[50%] translate-x-[-50%] z-10"
            >
              <ArrowLeftRight className="size-4 text-primary" />
            </Button>
            <FormField
              name="destination"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <Popover open={openGoingTo} onOpenChange={setOpenGoingTo}>
                    <PopoverTrigger className="w-full">
                      <div
                        className={cn(
                          " flex gap-1 cursor-pointer items-center p-0 pl-2 pt-1 relative bg-white pr-[10px] h-[56px] border rounded-md ",
                          openGoingTo && "border-b-[3px] border-b-primary"
                        )}
                      >
                        <FormLabel className="absolute top-0 left-0 translate-x-3 mt-[-12px] bg-white px-2 py-1 text-sm font-mont font-normal">
                          Going To
                        </FormLabel>
                        <FormControl>
                          <Input
                            // disabled={isPending}
                            placeholder="Going To"
                            type="text"
                            className="!bg-transparent cursor-pointer !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-base font-mont font-normal"
                            {...field}
                          />
                        </FormControl>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      align={"start"}
                      side={"bottom"}
                      sideOffset={3}
                      className="w-full max-w-[245px]  xs:max-w-[350px] sm:max-w-[350px] md:max-w-[420px] lg:max-w-[650px] p-0 my-3"
                    >
                      <ScrollArea className="h-[350px] md:h-[420px] lg:h-full">
                        {countriesDest.map((country, i) => (
                          <Card
                            key={country.continent}
                            className="p-0 border-none shadow-none"
                          >
                            <CardHeader className="bg-light-800 text-14_medium text-primary-blackishGreen/40 font-medium rounded-ss-md rounded-se-md p-0 py-2 px-3">
                              {country.continent}
                            </CardHeader>
                            <CardContent className="p-0 px-3 py-6">
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                                {country.cities.map((city) => (
                                  <Badge
                                    className="bg-light-700 cursor-pointer hover:bg-light-800 text-black/80 rounded-md font-light px-5 py-2 "
                                    key={city}
                                    onClick={() => {
                                      handleCityClick(field.name, city);
                                      setOpenGoingTo(false);
                                    }}
                                  >
                                    {city}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <ScrollBar orientation="vertical" />
                      </ScrollArea>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-4 xxl:col-span-2">
            <FormField
              name="tripType"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  <div
                    className={cn(
                      " flex gap-1 cursor-pointer items-center p-0 pl-2 pt-1 relative bg-white pr-[10px] h-[56px] border rounded-md ",
                      openTripWay && "border-b-[3px] border-b-primary"
                    )}
                  >
                    <FormLabel className="absolute top-0 left-0 translate-x-3 mt-[-12px] bg-white px-2 py-1 text-sm font-mont font-normal">
                      Trip
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setTripWayType(value);
                      }}
                      defaultValue={field.value}
                      open={openTripWay}
                      onOpenChange={setOpenTripWay}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 w-full no-focus focus:ring-0 focus:ring-transparent focus:ring-offset-0 "
                          )}
                        >
                          <SelectValue
                            placeholder="Select Trip Type"
                            className="!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-base font-mont font-normal"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="mt-2">
                        {tripWay.map((trip) => (
                          <SelectItem
                            key={trip}
                            value={trip.toLowerCase()}
                            className="cursor-pointer"
                          >
                            {trip}
                          </SelectItem>
                        ))}
                      </SelectContent>
                      {/* <Input
                        // disabled={isPending}
                        placeholder="Enter your destination"
                        type="email"
                        className=""
                        {...field}
                      /> */}
                    </Select>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6 xxl:col-span-3">
            <FormField
              name="departureDate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  <div
                    className={cn(
                      " flex gap-1 cursor-pointer items-center p-0 pl-1 pt-1 relative bg-white pr-[10px] h-[56px] border rounded-md ",
                      openDateCalendar && "border-b-[3px] border-b-primary"
                    )}
                  >
                    <FormLabel className="absolute top-0 left-0 translate-x-3 mt-[-12px] bg-white px-2 py-1 text-sm font-mont font-normal">
                      {tripWayType == "round-trip"
                        ? "Depart - Return"
                        : "Depart"}
                    </FormLabel>
                    <Popover
                      open={openDateCalendar}
                      onOpenChange={setOpenDateCalendar}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            id="date"
                            variant={"ghost"}
                            className={cn(
                              "!bg-transparent !border-none flex items-center focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-left text-base font-mont font-normal"
                            )}
                          >
                            <CalendarIcon className="mr-2 size-4" />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "LLL dd, y")}{" "}
                                  {tripWayType === "round-trip" && "-"}{" "}
                                  {tripWayType === "round-trip" &&
                                    format(date.to, "LLL dd, y")}
                                </>
                              ) : (
                                <>{format(date.from, "LLL dd, y")}</>
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 my-4" align="start">
                        {tripWayType === "round-trip" ? (
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            // onSelect={setDate}
                            onSelect={(dat) => {
                              setDate({
                                from: dat?.from,
                                to: dat?.to,
                              });
                              field.onChange(dat?.from);
                              form.setValue("arrivalDate", dat?.to);
                            }}
                            numberOfMonths={2}
                          />
                        ) : (
                          <Calendar
                            mode="single"
                            selected={date?.from}
                            onSelect={(date) => {
                              setDate({
                                to: addDays(new Date(date!), 20),
                                from: date,
                              });
                              field.onChange(date);
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        )}
                      </PopoverContent>
                    </Popover>
                    {/* <FormControl>
                      <Input
                        // disabled={isPending}
                        placeholder="Enter your destination"
                        type="date"
                        className="!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl> */}
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6 xxl:col-span-2">
            <Popover open={openPassengers} onOpenChange={setOpenPassengers}>
              <PopoverTrigger className="w-full">
                <div
                  className={cn(
                    " flex gap-1 cursor-pointer items-center p-0 pl-1 pt-1 relative bg-white pr-[10px] h-[56px] border rounded-md ",
                    openPassengers && "border-b-[3px] border-b-primary"
                  )}
                >
                  <Label className="absolute top-0 left-0 translate-x-3 mt-[-12px] bg-white px-2 py-1">
                    Passenger - Class
                  </Label>
                  <Button
                    type="button"
                    className="!bg-transparent w-full  text-primary-blackishGreen flex justify-start !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  >
                    {totalPassengers}{" "}
                    {totalPassengers > 1 ? "Passengers" : "Passenger"}{" "}
                    {flightClass && ","}{" "}
                    <span className="capitalize">{flightClass}</span>
                  </Button>
                  {/* <FormControl>
                      <Input
                        // disabled={isPending}
                        placeholder="Enter your destination"
                        type="email"
                        className="!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl> */}
                </div>
              </PopoverTrigger>
              <PopoverContent className="space-y-4 my-3">
                <p className="mb-2 text-xs">
                  Please select the exact number of passengers to view the best
                  prices
                </p>
                <div className="space-y-2">
                  <FormField
                    name="passengers.adults"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <Counter
                            disabled={isPending}
                            title="Adults"
                            subtitle="How many adults?"
                            totalPassengers={totalPassengers}
                            field={field}
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                              setAdultCount(value);
                            }}
                            name={field.name}
                            setValue={form.setValue}
                            reduceLimit={1}
                            addLimit={4}
                          />
                          {/* <Input
                        // disabled={isPending}
                        placeholder="Enter your destination"
                        type="email"
                        className="!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        {...field}
                      /> */}
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passengers.teenagers"
                    render={({ field }) => (
                      <Counter
                        disabled={isPending}
                        totalPassengers={totalPassengers}
                        title="Children"
                        subtitle="2-11 yrs at time of travel"
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          setTeenagersCount(value);
                        }}
                        name={field.name}
                        setValue={form.setValue}
                        field={field}
                        reduceLimit={0}
                        addLimit={2}
                        // {...field}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passengers.infants"
                    render={({ field }) => (
                      <Counter
                        disabled={isPending}
                        totalPassengers={totalPassengers}
                        title="Infants"
                        subtitle="Under 2 yrs at time of travel"
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);

                          setInfantsCount(value);
                        }}
                        name={field.name}
                        setValue={form.setValue}
                        field={field}
                        reduceLimit={0}
                        addLimit={1}
                        // {...field}
                      />
                    )}
                  />
                </div>
                <div className="mt-3">
                  <FormField
                    name="passengers.class"
                    control={form.control}
                    render={({ field }) => (
                      <div className="flex gap-1 items-center p-0 relative bg-white pr-[5px] h-[40px] border rounded-md ">
                        <Label className="absolute top-0 left-0 translate-x-3 mt-[-12px] bg-white px-2 py-1 text-xs">
                          Select Class
                        </Label>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setFlightClass(value);
                          }}
                          defaultValue={field.value}
                          open={openFlightClass}
                          onOpenChange={setOpenFlightClass}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                "!bg-transparent !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 w-full no-focus focus:ring-0 focus:ring-transparent focus:ring-offset-0 "
                              )}
                            >
                              <SelectValue
                                placeholder="Select Class"
                                className="!bg-transparent text-xs !border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="mt-2">
                            {cabinWay.map((trip) => (
                              <SelectItem
                                key={trip}
                                value={trip.toLowerCase()}
                                className="cursor-pointer"
                              >
                                {trip}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => setOpenPassengers(false)}
                    className="mt-3 py-1 ml-auto flex hover:bg-primary-salmon"
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <Button variant={"ghost"}>
            <Plus className="size-4 mr-2" /> Add Promo Code
          </Button>
          <Button
            className={cn(
              "h-[48px] px-[24px] text-primary-blackishGreen py-[16px] rounded-[8px] bg-primary hover:bg-primary-salmon"
            )}
          >
            <Send className="mr-2 size-4 text-14_medium font-semibold" /> Show
            Flights
          </Button>
        </div>
      </form>
    </Form>
  );
};
