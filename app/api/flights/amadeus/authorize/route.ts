import { NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import handleError from "@/lib/handlers/error";
import { NotFoundError, UnauthorizedError } from "@/lib/http-errors";

const API_URL = `${process.env.NEXT_AMADEUS_BASE_URL_v2}/security/oauth2/token`;
export async function GET() {
  const user = await currentUser();

  if (!user?.id) {
    throw new UnauthorizedError();
  }

  try {
    const url = new URL(API_URL);

    url.searchParams.append("grant_type", "client_credentials");
    url.searchParams.append(
      "client_id",
      process.env.NEXT_AMADEUS_API_KEY as string
    );
    url.searchParams.append(
      "client_secret",
      process.env.NEXT_AMADEUS_API_SECRET as string
    );

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      throw new UnauthorizedError();
    }

    const data = await response.json();

    if (!data.access_token) {
      throw new NotFoundError("Access token not received.");
    }
    return NextResponse.json(
      { success: true, token: data.access_token },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
