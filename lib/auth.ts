import { auth } from "@/auth";
import { db } from "./db";

export const currentUser = async () => {
  try {
    const session = await auth();

    if (!session?.user.email) return null;

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) return null;

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.createdAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user.role;
};
