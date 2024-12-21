import { NextRequest, NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import handleError from "@/lib/handlers/error";
import { NotFoundError, UnauthorizedError } from "@/lib/http-errors";
import { FlightOfferResponse } from "@/types/api.data";
const API_BASE_URL = process.env.NEXT_PUBLIC_API || "http://localhost:3001/api";
const BASE_URL = process.env.NEXT_AMADEUS_BASE_URL as string;

export async function GET(request: NextRequest) {
  const user = await currentUser();

  if (!user?.id) {
    throw new UnauthorizedError();
  }

  const { searchParams } = new URL(request.url);
  const originLocationCode = searchParams.get("originLocationCode");
  const destinationLocationCode = searchParams.get("destinationLocationCode");
  const departureDate = searchParams.get("departureDate");
  const returnDate = searchParams.get("returnDate");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const infants = searchParams.get("infants");
  const travelClass = searchParams.get("travelClass");
  const nonStop = searchParams.get("nonStop");
  const currencyCode = searchParams.get("currencyCode");
  const maxPrice = searchParams.get("maxPrice");
  // const max: number = 10;

  try {
    const url = new URL(`${API_BASE_URL}/amadeus/authorize`);
    const tokenPromise = await fetch(url);
    const { token } = await tokenPromise.json();
    if (!token) {
      throw new UnauthorizedError("No access token");
    }

    const hUrl = new URL(`${BASE_URL}/shopping/flight`);

    hUrl.searchParams.append(
      "originLocationCode",
      originLocationCode as string
    );
    hUrl.searchParams.append(
      "destinationLocationCode",
      destinationLocationCode as string
    );
    if (currencyCode) {
      hUrl.searchParams.append("currencyCode", currencyCode.toString());
    } else {
      hUrl.searchParams.append("currencyCode", "NGN");
    }
    hUrl.searchParams.append("departureDate", departureDate as string);
    hUrl.searchParams.append("adults", adults as string);
    if (returnDate) {
      hUrl.searchParams.append("returnDate", returnDate.toString());
    }
    if (children) {
      hUrl.searchParams.append("children", children.toString());
    }
    if (infants) {
      hUrl.searchParams.append("infants", infants.toString());
    }
    if (travelClass) {
      hUrl.searchParams.append("travelClass", travelClass as string);
    }
    if (nonStop) {
      hUrl.searchParams.append("nonStop", nonStop.toString());
    }

    if (maxPrice) {
      hUrl.searchParams.append("maxPrice", maxPrice.toString());
    }
    hUrl.searchParams.append("max", "12");

    const flightResponse = await fetch(hUrl.toString(), {
      method: "GET",
      headers: {
        accept: "application/vnd.amadeus+json", // Accept header
        Authorization: `Bearer ${token}`,
      },
    });

    if (!flightResponse.ok) {
      throw new NotFoundError("Flight not found");
    }

    const flightData: FlightOfferResponse = await flightResponse.json();

    return NextResponse.json(
      { success: true, flights: flightData.data },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
