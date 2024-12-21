import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import handleError from "@/lib/handlers/error";
import { ForbiddenError, NotFoundError } from "@/lib/http-errors";

export async function GET(request: NextRequest) {
  const { url } = request;
  const { searchParams } = new URL(url);
  const lat = parseFloat(searchParams.get("lat") || "");
  const lon = parseFloat(searchParams.get("lon") || "");

  console.log("lat", lat);
  if (!lat || !lon) {
    throw new ForbiddenError("Longitude and Latitide are required");
  }

  const query = `${lat},${lon}`;

  try {
    // Check if location exists in the database
    const existingLocation = await db.location.findFirst({
      where: { latitude: lat, longitude: lon },
    });

    if (existingLocation) {
      return NextResponse.json(
        { success: true, data: existingLocation },
        { status: 200 }
      );
    }

    const uri = `https://api.opencagedata.com/geocode/v1/json/geocode/v1/json?q=${encodeURIComponent(
      query
    )}&language=en&key=${process.env.NEXT_OPEN_CAGE_API}`;
    console.log(uri);

    const response = await fetch(uri);

    if (response.ok) {
      const data = await response.json();

      if (data.results.length === 0) {
        return new NotFoundError("Location");
      }
      console.log(data);
      const components = data?.results[0]?.components || {};
      const country = components.country || "";
      const state = components.state || "";
      const continent = components.continent || "";

      const createdLocation = await db.location.upsert({
        where: {
          state,
        },
        update: {
          latitude: lat,
          longitude: lon,
          city: state,
          country,
          state,
          continent,
        },
        create: {
          latitude: lat,
          longitude: lon,
          city: state,
          country,
          state,
          continent,
        },
      });

      return NextResponse.json(
        { success: true, data: createdLocation },
        { status: 200 }
      );
    }
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
