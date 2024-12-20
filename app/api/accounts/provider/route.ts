import { NextResponse } from "next/server";

import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { AccountSchema } from "@/lib/validations";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const { providerAccountId } = await request.json();

  try {
    const validatedData = AccountSchema.partial().safeParse({
      providerAccountId,
    });

    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const account = await db.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: validatedData.data.provider!,
          providerAccountId: validatedData.data.providerAccountId!,
        },
      },
    });
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
