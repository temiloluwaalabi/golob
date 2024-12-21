import { api } from "@/lib/api";
import { db } from "@/lib/db";
import handleError from "@/lib/handlers/error";
import { ForbiddenError, NotFoundError } from "@/lib/http-errors";
import { IAirport } from "@/types";
import { Location } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";
const API_BASE_URL = process.env.NEXT_PUBLIC_API || "http://localhost:3001/api";

const API_URL =
  "https://api.magicapi.dev/api/v1/aedbx/aerodatabox/airports/search/term";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const limit: number = 50;
  const withFlightInfoOnly: boolean = false;
  const withSearchByCode: boolean = false;

  if (!search || typeof search !== "string") {
    throw new ForbiddenError("Search term is required");
  }

  try {
    const existingAirports = await db.airport.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { municipalityName: { contains: search, mode: "insensitive" } },
          { iata: { contains: search, mode: "insensitive" } },
        ],
      },
    });

    if (existingAirports.length > 0) {
      console.log("EXISTING_AIRPORT", existingAirports);
      return NextResponse.json(
        { success: true, data: existingAirports },
        { status: 200 }
      );
    }

    const url = new URL(API_URL);
    url.searchParams.append("q", search);
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append(
      "withFlightInfoOnly",
      withFlightInfoOnly.toString()
    );
    url.searchParams.append("withSearchByCode", withSearchByCode.toString());
    const options = {
      method: "GET",
      headers: {
        "x-magicapi-key": process.env.AERO_DATA_BOX_API_KEY!,
      },
    };

    console.log(url);
    const response = await fetch(url.toString(), options);
    if (!response.ok) {
      throw new NotFoundError("Airports");
    }
    const data = await response.json();
    console.log("DATA_COUNT", data.count);
    const airports: IAirport[] = data.items;

    console.log("DATA_AIRPORT", airports);

    const savedAirports = await Promise.all(
      airports.map(async (airport: IAirport) => {
        const hUrl = new URL(`${API_BASE_URL}/reverse-geocode`);
        hUrl.searchParams.append("lat", airport.location.lat.toString());
        hUrl.searchParams.append("lon", airport.location.lon.toString());
        const response = await fetch(hUrl, {
          method: "GET",
        });
        if (!response.ok) {
          throw new NotFoundError("Location");
        }
        const location = await response.json();

        const saved = await db.airport.upsert({
          where: {
            iata: airport.iata,
          },
          update: {
            icao: airport.icao,
            iata: airport.iata,
            name: airport.name,
            shortName: airport.shortName,
            municipalityName: airport.municipalityName,
            countryCode: airport.countryCode,
            latitude: airport.location.lat,
            longitude: airport.location.lon,
            timezone: airport.timeZone,
            country: location.data?.country || "",
            state: location.data?.state,
            continent: location.data?.continent,
          },
          create: {
            icao: airport.icao,
            iata: airport.iata,
            name: airport.name,
            shortName: airport.shortName,
            municipalityName: airport.municipalityName,
            countryCode: airport.countryCode,
            latitude: airport.location.lat,
            longitude: airport.location.lon,
            timezone: airport.timeZone,
            country: location.data?.country || "",
            state: location.data?.state,
            continent: location.data?.continent,
          },
        });

        return saved;
      })
    );

    console.log("SAVED_AIRPORT", savedAirports);
    return NextResponse.json(
      { success: true, data: savedAirports },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
