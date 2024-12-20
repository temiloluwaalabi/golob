import { db } from "@/lib/db";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { SignInWithOAuthSchema } from "@/lib/validations";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(request: Request) {
  try {
    const { provider, providerAccountId, user } = await request.json();

    await db.$transaction(async (prisma) => {
      const validatedData = SignInWithOAuthSchema.safeParse({
        provider,
        providerAccountId,
        user,
      });

      if (!validatedData.success) {
        throw new ValidationError(validatedData.error.flatten().fieldErrors);
      }

      const { name, email, image, username } = user;

      const slugifiedUsername = slugify(username, {
        lower: true,
        strict: true,
        trim: true,
      });

      // find existing user
      let existingUser = await db.user.findUnique({
        where: {
          email,
        },
      });

      if (!existingUser) {
        existingUser = await db.user.create({
          data: {
            name,
            email,
            image,
            // username: slugifiedUsername,
          },
        });
      } else {
        // Update user details if needed

        const updatedData: { name?: string; image?: string } = {};

        if (existingUser.name !== name) updatedData.name = name;
        if (existingUser.image !== image) updatedData.image = image;

        if (Object.keys(updatedData).length > 0) {
          existingUser = await db.user.update({
            where: {
              id: existingUser.id,
            },
            data: updatedData,
          });
        }
      }

      const existingAccount = await db.account.findUnique({
        where: {
          userId: existingUser.id,
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
      });

      if (!existingAccount) {
        await db.account.create({
          data: {
            userId: existingUser.id,
            provider,
            providerAccountId,
            type: "oidc",
          },
        });
      }
      return { success: true };
    });

    return NextResponse.json({ sucess: true });
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
