/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @flow
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Airport } from "@prisma/client";
import { addDays, format } from "date-fns";
import {
  ArrowLeftRight,
  CalendarIcon,
  ChevronDown,
  Earth,
  Landmark,
  MapPin,
  Plane,
  Plus,
  Search,
  Send,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import * as React from "react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  getAllAirports,
  getAllDBAirports,
} from "@/app/actions/airports.action";
import { cabinWay, countriesDest, tripWay } from "@/constants";
import useDebounce from "@/hooks/use-debouce";
import { NotFoundError } from "@/lib/http-errors";
import { cn, formatDateToYMD } from "@/lib/utils";
import { FligthSearchSchema } from "@/lib/validations";
import {
  Continent,
  PopularLocation,
  SearchResults,
  UniqueLocation,
  UniqueStates,
} from "@/types/main";

import Counter from "../shared/counter";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// type Props = {
//   countries: RegionCountry[];
// };

export const useQueryParams = <
  T extends Record<string, string | string[]>
>(): T => {
  const searchParams = useSearchParams();
  const params: Record<string, string | string[] | null> = {};

  for (const [key, value] of searchParams.entries()) {
    if (value.includes(",")) {
      params[key] = value.split(",");
    } else {
      params[key] = value;
    }
  }

  return params as T;
};

export const FlightSearchForm = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [destinationSearch, setDestinationSearch] = React.useState<string>("");
  const [tripWayType, setTripWayType] = useState("round-trip");
  const [flightClass, setFlightClass] = useState("");
  const [openLeavingFrom, setOpenLeavingFrom] = useState(false);
  const [openGoingTo, setOpenGoingTo] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  const router = useRouter();
  const queryParams: Record<string, string | null> = {};

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const [openPassengers, setOpenPassengers] = useState(false);
  const [openDateCalendar, setOpenDateCalendar] = useState(false);
  const [openFlightClass, setOpenFlightClass] = useState(false);
  const [openTripWay, setOpenTripWay] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [totalPassengers, settotalPassengers] = useState(0);
  const [teenagersCount, setTeenagersCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);
  // const [takeOffAirport, setTakeOffAirport] = useState<Partial<Airport[]>>();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openStateIndex, setOpenStateIndex] = useState<number | null>(null);
  const [continents, setContinents] = useState<Continent[]>([]);
  const [statesData, setStatesData] = useState<UniqueStates>([]);
  const [airports, setAirports] = useState<Airport[]>();

  const [searchResults, setSearchResults] = useState<SearchResults>();
  const [searchDesResults, setSearchDesResults] = useState<SearchResults>();

  const form = useForm<z.infer<typeof FligthSearchSchema>>({
    resolver: zodResolver(FligthSearchSchema),
    defaultValues: {
      tripType: "round-trip",
      departureDate: new Date(),
      arrivalDate: addDays(new Date(), 10),
      passengers: {
        adults: adultCount,
        class: "economy",
        teenagers: teenagersCount,
        infants: infantsCount,
      },
    },
  });

  console.log(error);
  React.useMemo(() => {
    settotalPassengers(adultCount + teenagersCount + infantsCount);
  }, [adultCount, infantsCount, teenagersCount]);

  // fetch current location
  React.useEffect(() => {
    const getCurrentLocation = () => {
      if (!navigator.geolocation)
        return setCurrentLocation("Geolocation not supported by browser.");
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        // Use a reverse geocoding API to get location details (city, country, etc.)
        try {
          const response = await fetch(
            `/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
          );
          if (!response.ok) {
            throw new NotFoundError("Failed to fetch city");
          }
          const data = await response.json();
          setCurrentLocation(data.data.state);
        } catch (err) {
          setError((err as Error).message);
        }
      });
    };
    getCurrentLocation(); // Call the function initially
  }, []);
  // Fetch data for continents, states, and airports
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { continents, uniqueStates } = await getAllAirports();
        setContinents(continents);
        setStatesData(uniqueStates);
        const airports = await getAllDBAirports();
        if (airports.success) setAirports(airports.airports);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const debouncedSearchQuery = useDebounce(searchQuery, 300); // Debounce by 300ms
  const debouncedDesSearchQuery = useDebounce(destinationSearch, 300); // Debounce by 300ms

  // get popular states
  const getPopularStates = (continentName: string, airports: Airport[]) => {
    const continent = continents.find(
      (c) => c.name?.toLowerCase() === continentName.toLowerCase()
    );

    if (!continent) {
      return []; // Handle case where continent is not found
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let popularStates: PopularLocation[] = [];

    continent.countries.forEach((countryName) => {
      if (countryName) {
        // Check if countryName is not null (e.g., for North America)
        const countryStates = statesData.filter(
          (state) =>
            state.country?.toLowerCase() === countryName.name.toLowerCase()
        );
        const numPopularStates = Math.min(3, countryStates.length); // Get at most 3 popular states per country
        const selectedStates = countryStates.slice(0, numPopularStates);

        const statesWithIata = selectedStates.map((state) => {
          const matchingAirports = airports.filter(
            (airport) =>
              airport.state?.toLowerCase() === state.name?.toLocaleLowerCase()
          );

          const iataCodes = matchingAirports.map((airport) => airport.iata);

          return {
            ...state,
            iataCodes,
          };
        });

        popularStates = popularStates.concat(statesWithIata);
      }
    });

    return popularStates;
  };
  // Search results generation
  const getSearchResults = (
    query: string,
    airportsData: Airport[]
  ): SearchResults => {
    console.log("Search result called");
    if (!query.trim()) return { countries: [], states: [], airports: [] };
    const normalizedQuery = query.toLowerCase();

    const countries = continents
      .flatMap((continent) => continent.countries)
      .filter((country) => country.name.toLowerCase().includes(normalizedQuery))
      .map((country) => ({
        name: country.name,
        code: country.code,
        airports: country.airports.slice(0, 5).map((airport) => ({
          name: airport.name,
          code: airport.code,
        })),
      }));

    // Search by state
    const states = statesData
      .filter((state) => state.name?.toLowerCase().includes(normalizedQuery))
      .map((state) => ({
        name: state.name || "Unknown State",
        country: state.country || "Un",
        airports: airportsData
          .filter((airport) => airport.state === state.name)
          .slice(0, 6)
          .map((airport) => ({
            name: airport.name,
            code: airport.iata,
          })),
      }));
    // Search by airport
    const airports = airportsData
      .filter((airport) => airport.name.toLowerCase().includes(normalizedQuery))
      .map((airport) => ({
        name: airport.name,
        code: airport.iata,
        state: airport.state || "Unknown State",
        country: airport.country,
      }));

    return {
      countries,
      states,
      airports,
    };
  };

  const handleOpenChange = (index: number, isOpen: boolean) => {
    setOpenIndex(isOpen ? index : null);
  };
  const handleOpenStateChange = (index: number, isOpen: boolean) => {
    setOpenStateIndex(isOpen ? index : null);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCityClick = async (name: any, value: string) => {
    form.setValue(name, value);
  };
  const handleSwapCities = async (
    takeOffCity: string,
    destinationCity: string
  ) => {
    form.setValue("takeOff", destinationCity);
    form.setValue("destination", takeOffCity);
  };
  const handleSubmit = async (values: z.infer<typeof FligthSearchSchema>) => {
    console.log(values);
    let searchParams;
    searchParams = {
      originLocationCode: values.takeOff,
      destinationLocationCode: values.destination,
      departureDate: formatDateToYMD(values.departureDate),
      adults: values.passengers.adults,
      children: values.passengers.teenagers,
      infants: values.passengers.infants,
      travelClass: values.passengers.class,
    };

    if (values.arrivalDate) {
      searchParams = {
        ...searchParams,
        returnDate: formatDateToYMD(values.arrivalDate),
      };
    }

    const queryString = qs.stringify(searchParams, { skipNull: true });
    const url = `/flights?${queryString}`;

    console.log("URL", url);
    router.push(url);
  };

  const hasSearchResults =
    searchQuery &&
    searchResults &&
    (searchResults.countries.length > 0 ||
      searchResults.states.length > 0 ||
      searchResults.airports.length > 0);

  const hasDesSearchResults =
    destinationSearch &&
    searchDesResults &&
    (searchDesResults.countries.length > 0 ||
      searchDesResults.states.length > 0 ||
      searchDesResults.airports.length > 0);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-end gap-4 lg:gap-8"
      >
        <div className="grid w-full grid-cols-12 gap-4">
          <div className="relative col-span-12 flex flex-col gap-4 md:col-span-8  md:flex-row md:gap-3 xxl:col-span-5">
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
                          " flex gap-1 cursor-pointer items-center p-0 pl-2 relative bg-white pr-[10px] h-[56px] border rounded-md ",
                          openLeavingFrom && "border-b-[3px] border-b-primary"
                        )}
                      >
                        {/* <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1 font-mont text-sm font-normal">
                          Leaving From
                        </FormLabel> */}
                        <div className="flex rounded-md">
                          {field.value && airports && (
                            <div className="relative flex w-full flex-col items-start bg-green-200 px-2">
                              <Button
                                onClick={() => form.setValue("takeOff", "")}
                                type="button"
                                variant={"outline"}
                                size={"icon"}
                                className="absolute right-0 top-0 mr-1 mt-1 size-3 border-none bg-primary-blackishGreen text-white shadow-none outline-none"
                              >
                                <X className="size-2" />
                              </Button>
                              <span className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
                                <span className="text-14 text-ellipsis font-semibold">
                                  {
                                    airports.find(
                                      (airport) => airport.iata === field.value
                                    )?.state
                                  }
                                </span>
                                <span className="text-xs font-normal">
                                  {
                                    airports.find(
                                      (airport) => airport.iata === field.value
                                    )?.iata
                                  }{" "}
                                </span>
                              </span>
                              <span className="w-full overflow-hidden whitespace-nowrap text-left text-xs">
                                {
                                  airports.find(
                                    (airport) => airport.iata === field.value
                                  )?.name
                                }
                              </span>
                            </div>
                          )}
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder={field.value ? "" : "Leaving From"}
                              type="text"
                              className=" cursor-pointer !border-none !bg-transparent font-mont text-base font-normal focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                              value={field.value ? "" : ""}
                              onChange={(e) => {
                                e.preventDefault();
                                setSearchQuery(e.target.value);
                                setOpenLeavingFrom(true);
                              }}
                            />
                          </FormControl>
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      align={"start"}
                      side={"bottom"}
                      sideOffset={3}
                      className="my-3 w-full max-w-full p-0 xs:max-w-[350px] sm:max-w-[350px] md:max-w-[420px] lg:max-w-[500px]"
                    >
                      <div className="border-b p-2">
                        <div className="relative flex h-12 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors">
                          <Search className="mr-2 size-4 shrink-0  opacity-50" />
                          <Input
                            placeholder="Leaving From..."
                            value={searchQuery}
                            onChange={(e) => {
                              e.preventDefault();
                              setSearchQuery(e.target.value);
                              if (airports && airports.length > 0) {
                                const results = getSearchResults(
                                  debouncedSearchQuery,
                                  airports
                                );
                                setSearchResults(results);
                              }
                            }}
                            className="no-focus h-10 border-none p-0 shadow-none outline-none"
                          />
                        </div>
                      </div>
                      <ScrollArea className="h-[350px] w-full md:h-[420px] lg:h-[500px]">
                        {hasSearchResults ? (
                          <div className=" py-2">
                            {searchResults?.countries?.length > 0 &&
                              searchResults?.countries.map((countryName, i) => {
                                const isOpen = openIndex === i;
                                return (
                                  <Collapsible
                                    key={countryName.name}
                                    open={isOpen}
                                    onOpenChange={(newState) =>
                                      handleOpenChange(i, newState)
                                    }
                                  >
                                    <CollapsibleTrigger
                                      className={cn(
                                        "border-b flex items-start justify-start bg-accent w-full py-4 px-3",
                                        !searchResults.states &&
                                          !searchResults.airports &&
                                          i ===
                                            searchResults.countries.length -
                                              1 &&
                                          "border-none"
                                      )}
                                    >
                                      <Earth className="me-2 mt-1 size-4" />

                                      <div className="!m-0 flex flex-col items-start justify-start !p-0 font-medium text-blue-800">
                                        <span>{countryName.name}</span>
                                        <span className="text-xs font-normal text-gray-500">
                                          {countryName.name}
                                        </span>
                                      </div>

                                      <ChevronDown
                                        strokeWidth={3}
                                        className={cn(
                                          "size-3 -rotate-90 ml-auto text-gray-500 transition-transform duration-200 rtl:rotate-90",
                                          isOpen && "rotate-0 rtl:rotate-0"
                                        )}
                                      />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pl-10">
                                      {countryName.airports.map(
                                        (airport, i) => (
                                          <span
                                            onClick={() =>
                                              handleCityClick(
                                                field.name,
                                                airport.code
                                              )
                                            }
                                            key={`${airport.code} - ${i}`}
                                            className={cn(
                                              "cursor-pointer flex text-gray-600 items-start gap-1 py-4 border-b hover:bg-white",
                                              i ===
                                                countryName.airports.length -
                                                  1 && "border-none"
                                            )}
                                          >
                                            <Plane className="me-2 mt-1 size-4" />
                                            <span className="max-w-[250px] text-ellipsis">
                                              {airport.name} Airport
                                            </span>
                                            <span className="ms-4 mt-1 text-xs font-normal">
                                              {airport.code}
                                            </span>
                                          </span>
                                        )
                                      )}
                                    </CollapsibleContent>
                                  </Collapsible>
                                );
                              })}
                            {searchResults?.states?.length > 0 &&
                              searchResults?.states.map((state, i) => {
                                const isOpen = openStateIndex === i;

                                return (
                                  <Collapsible
                                    key={state.name}
                                    open={isOpen}
                                    onOpenChange={(newState) =>
                                      handleOpenStateChange(i, newState)
                                    }
                                  >
                                    <CollapsibleTrigger
                                      className={cn(
                                        "border-b flex items-start justify-start bg-accent w-full py-4 px-3 m-0",
                                        !searchResults.countries &&
                                          !searchResults.airports &&
                                          i ===
                                            searchResults.states.length - 1 &&
                                          "border-none"
                                      )}
                                    >
                                      <Landmark className="me-2 mt-1 size-4" />
                                      <div className="!m-0 flex flex-col items-start justify-start !p-0 font-medium text-blue-800">
                                        <span>{state.name} State</span>
                                        <span className="text-xs font-normal text-gray-500">
                                          {state.name} State, {state.country}
                                        </span>
                                      </div>
                                      <ChevronDown
                                        strokeWidth={3}
                                        className={cn(
                                          "size-3 -rotate-90 ml-auto text-gray-500 transition-transform duration-200 rtl:rotate-90",
                                          isOpen && "rotate-0 rtl:rotate-0"
                                        )}
                                      />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pl-10">
                                      {state.airports.map((airport) => (
                                        <span
                                          key={`${airport.code} - ${i} - star`}
                                          onClick={() =>
                                            handleCityClick(
                                              field.name,
                                              airport.code
                                            )
                                          }
                                          className={cn(
                                            "cursor-pointer flex hover:bg-white text-gray-600 items-start gap-1 py-4 border-b",
                                            i === state.airports.length - 1 &&
                                              "border-none"
                                          )}
                                        >
                                          <Plane className="me-2 mt-1 size-4" />
                                          <span className="max-w-[250px] text-ellipsis">
                                            {airport.name} Airport
                                          </span>
                                          <span className="ms-4 mt-1 text-xs font-normal">
                                            {airport.code}
                                          </span>
                                        </span>
                                      ))}
                                    </CollapsibleContent>
                                  </Collapsible>
                                );
                              })}
                            {searchResults?.airports?.length > 0 &&
                              searchResults?.airports.map((airport, i) => (
                                <div
                                  key={airport.name}
                                  onClick={() =>
                                    handleCityClick(field.name, airport.code)
                                  }
                                  className={cn(
                                    "border-b cursor-pointer hover:bg-white flex items-start justify-start bg-accent w-full py-4 px-3",
                                    !searchResults.countries &&
                                      !searchResults.states &&
                                      i === searchResults.airports.length - 1 &&
                                      "border-none"
                                  )}
                                >
                                  <Plane className="me-2 mt-1 size-4" />
                                  <div className="flex flex-col gap-1">
                                    <span>
                                      <span className="max-w-[250px] text-ellipsis">
                                        {airport.name} Airport
                                      </span>
                                      <span className="ms-2 text-xs font-normal">
                                        {airport.code}
                                      </span>
                                    </span>
                                    <span className="text-xs font-normal text-gray-500">
                                      {airport.state} State, {airport.country}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <>
                            {currentLocation && (
                              <div className="space-y-3 px-3 py-4">
                                <h5 className="text-sm font-medium">
                                  Current Location
                                </h5>
                                <h2 className="m-0 flex items-start gap-2 text-sm font-normal">
                                  <MapPin className="me-2 mt-1 size-4 text-black" />{" "}
                                  {currentLocation}
                                </h2>
                              </div>
                            )}
                            {/* Replace with actual current location */}
                            {continents.map((country, i) => (
                              <Card
                                key={`${country.name} - ${i} - concoun`}
                                className="border-none p-0 shadow-none"
                              >
                                <CardHeader className="text-14_medium bg-light-800 p-0 px-3 py-2 font-medium text-primary-blackishGreen/40">
                                  {country.name}
                                </CardHeader>
                                <CardContent className="p-0 px-3 py-6">
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                                    {airports &&
                                      getPopularStates(
                                        country.name!,
                                        airports
                                      ).map((city) => (
                                        <Badge
                                          className="cursor-pointer rounded-md bg-light-700 px-5 py-2 font-light text-black/80 hover:bg-light-800 "
                                          key={city.name}
                                          onClick={() => {
                                            handleCityClick(
                                              field.name,
                                              city.iataCodes[0]
                                            );
                                            // setOpenLeavingFrom(false);
                                          }}
                                        >
                                          {city.name}
                                        </Badge>
                                      ))}
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
              className="absolute left-1/2 top-1/2 z-10 h-auto -translate-x-1/2 -translate-y-1/2 rotate-90 rounded-full bg-light-700 p-2 hover:bg-light-800 md:rotate-0"
            >
              <ArrowLeftRight className="size-4 text-primary" />
            </Button>
            <FormField
              name="destination"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <Popover open={openGoingTo} onOpenChange={setOpenGoingTo}>
                    <PopoverTrigger className="w-full">
                      <div
                        className={cn(
                          " flex gap-1 cursor-pointer items-center p-0 pl-2 relative bg-white pr-[10px] h-[56px] border rounded-md ",
                          openGoingTo && "border-b-[3px] border-b-primary"
                        )}
                      >
                        {/* <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1 font-mont text-sm font-normal">
                        Leaving From
                      </FormLabel> */}
                        <div className="flex rounded-md">
                          {field.value && airports && (
                            <div className="relative flex w-full flex-col items-start bg-green-200 px-2">
                              <Button
                                onClick={() => form.setValue("destination", "")}
                                type="button"
                                variant={"outline"}
                                size={"icon"}
                                className="absolute right-0 top-0 mr-1 mt-1 size-3 border-none bg-primary-blackishGreen text-white shadow-none outline-none"
                              >
                                <X className="size-2" />
                              </Button>
                              <span className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
                                <span className="text-14 text-ellipsis font-semibold">
                                  {
                                    airports.find(
                                      (airport) => airport.iata === field.value
                                    )?.state
                                  }
                                </span>
                                <span className="text-xs font-normal">
                                  {
                                    airports.find(
                                      (airport) => airport.iata === field.value
                                    )?.iata
                                  }{" "}
                                </span>
                              </span>
                              <span className="w-full overflow-hidden whitespace-nowrap text-left text-xs">
                                {
                                  airports.find(
                                    (airport) => airport.iata === field.value
                                  )?.name
                                }
                              </span>
                            </div>
                          )}
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder={field.value ? "" : "Going To"}
                              type="text"
                              className=" cursor-pointer !border-none !bg-transparent font-mont text-base font-normal focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                              value={field.value ? "" : ""}
                              onChange={(e) => {
                                e.preventDefault();
                                setDestinationSearch(e.target.value);
                                setOpenGoingTo(true);
                              }}
                            />
                          </FormControl>
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      align={"start"}
                      side={"bottom"}
                      sideOffset={3}
                      className="my-3 w-full max-w-full p-0 xs:max-w-[350px] sm:max-w-[350px] md:max-w-[420px] lg:max-w-[500px]"
                    >
                      <div className="border-b p-2">
                        <div className="relative flex h-12 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors">
                          <Search className="mr-2 size-4 shrink-0  opacity-50" />
                          <Input
                            placeholder="Going To..."
                            value={destinationSearch}
                            onChange={(e) => {
                              e.preventDefault();
                              setDestinationSearch(e.target.value);
                              if (airports && airports.length > 0) {
                                const results = getSearchResults(
                                  debouncedDesSearchQuery,
                                  airports
                                );
                                setSearchDesResults(results);
                              }
                            }}
                            className="no-focus h-10 border-none p-0 shadow-none outline-none"
                          />
                        </div>
                      </div>
                      <ScrollArea className="h-[350px] w-full md:h-[420px] lg:h-[500px]">
                        {hasDesSearchResults ? (
                          <div className=" py-2">
                            {searchDesResults?.countries?.length > 0 &&
                              searchDesResults?.countries.map(
                                (countryName, i) => {
                                  const isOpen = openIndex === i;
                                  return (
                                    <Collapsible
                                      key={countryName.name}
                                      open={isOpen}
                                      onOpenChange={(newState) =>
                                        handleOpenChange(i, newState)
                                      }
                                    >
                                      <CollapsibleTrigger
                                        className={cn(
                                          "border-b flex items-start justify-start bg-accent w-full py-4 px-3",
                                          !searchDesResults.states &&
                                            !searchDesResults.airports &&
                                            i ===
                                              searchDesResults.countries
                                                .length -
                                                1 &&
                                            "border-none"
                                        )}
                                      >
                                        <Earth className="me-2 mt-1 size-4" />

                                        <div className="!m-0 flex flex-col items-start justify-start !p-0 font-medium text-blue-800">
                                          <span>{countryName.name}</span>
                                          <span className="text-xs font-normal text-gray-500">
                                            {countryName.name}
                                          </span>
                                        </div>

                                        <ChevronDown
                                          strokeWidth={3}
                                          className={cn(
                                            "size-3 -rotate-90 ml-auto text-gray-500 transition-transform duration-200 rtl:rotate-90",
                                            isOpen && "rotate-0 rtl:rotate-0"
                                          )}
                                        />
                                      </CollapsibleTrigger>
                                      <CollapsibleContent className="pl-10">
                                        {countryName.airports.map(
                                          (airport, i) => (
                                            <span
                                              onClick={() =>
                                                handleCityClick(
                                                  field.name,
                                                  airport.code
                                                )
                                              }
                                              key={`${airport.code} - ${i}`}
                                              className={cn(
                                                "cursor-pointer flex text-gray-600 items-start gap-1 py-4 border-b hover:bg-white",
                                                i ===
                                                  countryName.airports.length -
                                                    1 && "border-none"
                                              )}
                                            >
                                              <Plane className="me-2 mt-1 size-4" />
                                              <span className="max-w-[250px] text-ellipsis">
                                                {airport.name} Airport
                                              </span>
                                              <span className="ms-4 mt-1 text-xs font-normal">
                                                {airport.code}
                                              </span>
                                            </span>
                                          )
                                        )}
                                      </CollapsibleContent>
                                    </Collapsible>
                                  );
                                }
                              )}
                            {searchDesResults?.states?.length > 0 &&
                              searchDesResults?.states.map((state, i) => {
                                const isOpen = openStateIndex === i;

                                return (
                                  <Collapsible
                                    key={state.name}
                                    open={isOpen}
                                    onOpenChange={(newState) =>
                                      handleOpenStateChange(i, newState)
                                    }
                                  >
                                    <CollapsibleTrigger
                                      className={cn(
                                        "border-b flex items-start justify-start bg-accent w-full py-4 px-3 m-0",
                                        !searchDesResults.countries &&
                                          !searchDesResults.airports &&
                                          i ===
                                            searchDesResults.states.length -
                                              1 &&
                                          "border-none"
                                      )}
                                    >
                                      <Landmark className="me-2 mt-1 size-4" />
                                      <div className="!m-0 flex flex-col items-start justify-start !p-0 font-medium text-blue-800">
                                        <span>{state.name} State</span>
                                        <span className="text-xs font-normal text-gray-500">
                                          {state.name} State, {state.country}
                                        </span>
                                      </div>
                                      <ChevronDown
                                        strokeWidth={3}
                                        className={cn(
                                          "size-3 -rotate-90 ml-auto text-gray-500 transition-transform duration-200 rtl:rotate-90",
                                          isOpen && "rotate-0 rtl:rotate-0"
                                        )}
                                      />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pl-10">
                                      {state.airports.map((airport) => (
                                        <span
                                          key={`${airport.code} - ${i} - star`}
                                          onClick={() =>
                                            handleCityClick(
                                              field.name,
                                              airport.code
                                            )
                                          }
                                          className={cn(
                                            "cursor-pointer flex hover:bg-white text-gray-600 items-start gap-1 py-4 border-b",
                                            i === state.airports.length - 1 &&
                                              "border-none"
                                          )}
                                        >
                                          <Plane className="me-2 mt-1 size-4" />
                                          <span className="max-w-[250px] text-ellipsis">
                                            {airport.name} Airport
                                          </span>
                                          <span className="ms-4 mt-1 text-xs font-normal">
                                            {airport.code}
                                          </span>
                                        </span>
                                      ))}
                                    </CollapsibleContent>
                                  </Collapsible>
                                );
                              })}
                            {searchDesResults?.airports?.length > 0 &&
                              searchDesResults?.airports.map((airport, i) => (
                                <div
                                  key={airport.name}
                                  onClick={() =>
                                    handleCityClick(field.name, airport.code)
                                  }
                                  className={cn(
                                    "border-b cursor-pointer hover:bg-white flex items-start justify-start bg-accent w-full py-4 px-3",
                                    !searchDesResults.countries &&
                                      !searchDesResults.states &&
                                      i ===
                                        searchDesResults.airports.length - 1 &&
                                      "border-none"
                                  )}
                                >
                                  <Plane className="me-2 mt-1 size-4" />
                                  <div className="flex flex-col gap-1">
                                    <span>
                                      <span className="max-w-[250px] text-ellipsis">
                                        {airport.name} Airport
                                      </span>
                                      <span className="ms-2 text-xs font-normal">
                                        {airport.code}
                                      </span>
                                    </span>
                                    <span className="text-xs font-normal text-gray-500">
                                      {airport.state} State, {airport.country}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <>
                            {currentLocation && (
                              <div className="space-y-3 px-3 py-4">
                                <h5 className="text-sm font-medium">
                                  Current Location
                                </h5>
                                <h2 className="m-0 flex items-start gap-2 text-sm font-normal">
                                  <MapPin className="me-2 mt-1 size-4 text-black" />{" "}
                                  {currentLocation}
                                </h2>
                              </div>
                            )}
                            {/* Replace with actual current location */}
                            {continents.map((country, i) => (
                              <Card
                                key={`${country.name} - ${i} - rconcoun`}
                                className="border-none p-0 shadow-none"
                              >
                                <CardHeader className="text-14_medium bg-light-800 p-0 px-3 py-2 font-medium text-primary-blackishGreen/40">
                                  {country.name}
                                </CardHeader>
                                <CardContent className="p-0 px-3 py-6">
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                                    {airports &&
                                      getPopularStates(
                                        country.name!,
                                        airports
                                      ).map((city) => (
                                        <Badge
                                          className="cursor-pointer rounded-md bg-light-700 px-5 py-2 font-light text-black/80 hover:bg-light-800 "
                                          key={city.name}
                                          onClick={() => {
                                            handleCityClick(
                                              field.name,
                                              city.iataCodes[0]
                                            );
                                            // setOpenLeavingFrom(false);
                                          }}
                                        >
                                          {city.name}
                                        </Badge>
                                      ))}
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
                    <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1 font-mont text-sm font-normal">
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
                            className="!border-none !bg-transparent font-mont text-base font-normal focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                    <FormLabel className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1 font-mont text-sm font-normal">
                      {tripWayType === "round-trip"
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
                      <PopoverContent className="my-4 w-auto p-0" align="start">
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
                  <Label className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1">
                    Passenger - Class
                  </Label>
                  <Button
                    type="button"
                    className="flex w-full  justify-start !border-none !bg-transparent text-primary-blackishGreen focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
              <PopoverContent className="my-3 space-y-4">
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
                      <div className="relative flex h-[40px] items-center gap-1 rounded-md border bg-white p-0 pr-[5px] ">
                        <Label className="absolute left-0 top-0 mt-[-12px] translate-x-3 bg-white px-2 py-1 text-xs">
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
                                className="!border-none !bg-transparent text-xs focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                    className="ml-auto mt-3 flex py-1 hover:bg-primary-salmon"
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
          <Button variant={"ghost"}>
            <Plus className="mr-2 size-4" /> Add Promo Code
          </Button>
          <Button
            className={cn(
              "h-[48px] px-[24px] text-primary-blackishGreen py-[16px] rounded-[8px] bg-primary hover:bg-primary-salmon"
            )}
          >
            <Send className="text-14_medium mr-2 size-4 font-semibold" /> Show
            Flights
          </Button>
        </div>
      </form>
    </Form>
  );
};
