import { db } from "@/lib/db";
import handleError from "@/lib/handlers/error";
import { ForbiddenError, NotFoundError } from "@/lib/http-errors";
import { IAirport } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const API_URL =
  "https://api.magicapi.dev/api/v1/aedbx/aerodatabox/airports/search/term";
export async function GET(request: NextRequest) {
  const { url } = request;
  const { searchParams } = new URL(url);
  const search = searchParams.get("search");

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
      return NextResponse.json(
        { success: true, existingAirports },
        { status: 200 }
      );
    }

    const uri = `${API_URL}?q=${encodeURIComponent(
      search
    )}&limit=20&withFlightInfoOnly=false&&withSearchByCode=true`;
    console.log(uri);

    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "x-magicapi-key": process.env.NEXT_AERO_BOX_BASE_URL!,
      },
    });

    if (!response.ok) {
      throw new NotFoundError("Airports");
    }
    const data = await response.json();

    const airports: IAirport[] = data.items;

    const savedAirports = await Promise.all(
      airports.map((airport: IAirport) =>
        db.airport.upsert({
          where: {
            iata: airport.iata,
          },
          update: {
            ...airport,
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
          },
        })
      )
    );

    return NextResponse.json({ success: true, savedAirports }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
