import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import handleError from "@/lib/handlers/error";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/http-errors";

const API_URL = "https://api.aviationstack.com/v1/flights";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    throw new UnauthorizedError();
  }

  try {
    const { searchParams } = new URL(request.url);
    const depIata = searchParams.get("dep_iata");
    const arrIata = searchParams.get("arr_iata");
    const flightDate = searchParams.get("flight_date");
    const limit: number = 10;

    if (!depIata && !arrIata && !flightDate) {
      throw new ForbiddenError("Flight parameters are required");
    }

    const url = new URL(API_URL);
    url.searchParams.append(
      "access_key",
      process.env.AVIATION_STAKC_API_KEY as string
    );
    url.searchParams.append("dep_iata", depIata as string);
    url.searchParams.append("arr_iata", arrIata as string);
    url.searchParams.append("flight_date", flightDate as string);
    url.searchParams.append("limit", limit.toString());

    const options = {
      method: "GET",
    };

    console.log(url);

    const response = await fetch(url.toString(), options);

    if (!response.ok) {
      throw new NotFoundError("AVIATION STACK FLIGHT API");
    }

    const data = await response.json();

    console.log("FLIGHT_DATA", data);

    return NextResponse.json(
      { success: true, data },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
