import { db } from "@/lib/db";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

// GET /API/USERS/ID
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("User");

  try {
    const user = await db.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

// DELETE /API?USERS/[ID]
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) throw new NotFoundError("User");
  try {
    const user = await db.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const validatedData = UserSchema.partial().parse(body);

  if (!id) throw new NotFoundError("User");
  try {
    const updatedUser = await db.user.update({
      where: {
        id: id,
      },
      data: {
        ...validatedData,
      },
    });

    if (!updatedUser) throw new NotFoundError("User");

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
