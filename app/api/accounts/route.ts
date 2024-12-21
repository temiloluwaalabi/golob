import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import handleError from "@/lib/handlers/error";
import { ForbiddenError } from "@/lib/http-errors";
import { AccountSchema } from "@/lib/validations";

export async function GET() {
  try {
    const accounts = await db.account.findMany();

    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = AccountSchema.parse(body);

    const existingAccount = await db.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: validatedData.provider,
          providerAccountId: validatedData.providerAccountId,
        },
      },
    });

    if (existingAccount)
      throw new ForbiddenError(
        "An account with the same provider already exists"
      );

    const newAccount = await db.account.create({
      data: {
        ...validatedData,
      },
    });

    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
