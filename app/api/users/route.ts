import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { RegisterSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.airport.findMany();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedFields = RegisterSchema.safeParse(body);
    if (!validatedFields.success) {
      throw new ValidationError(validatedFields.error.flatten().fieldErrors);
    }

    const { firstName, lastName, number, email, auth } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(auth.password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new Error("user already exists");
    }

    const user = await db.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
        hashedPassword,
        phoneNumber: number,
      },
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
