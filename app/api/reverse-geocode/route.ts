import handleError from "@/lib/handlers/error";
import { ForbiddenError, NotFoundError } from "@/lib/http-errors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { url } = request;
  const { searchParams } = new URL(url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  console.log("lat", lat);
  if (!lat || !lon) {
    throw new ForbiddenError("Longitude and Latitide are required");
  }

  let query = lat + "," + lon;

  try {
    const uri = `https://api.opencagedata.com/geocode/v1/json/geocode/v1/json?q=${encodeURIComponent(
      query
    )}&key=${process.env.NEXT_OPEN_CAGE_API}`;
    console.log(uri);

    const response = await fetch(uri);

    if (response.ok) {
      const data = await response.json();

      if (data.results.length === 0) {
        return new NotFoundError("Location");
      }
      console.log(data);
      const city = data.results[0].components.state;

      return NextResponse.json({ success: true, data: city }, { status: 200 });
    }
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
