import { VerificationToken } from "@prisma/client";

import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (
  email: string
): Promise<VerificationToken | null> => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};
