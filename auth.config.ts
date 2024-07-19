import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./lib/validations";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        // console.log("Authorize function received credentials", credentials);

        if (validatedFields.success) {
          // console.log("Input fields are valid");
          const { email, password } = validatedFields.data;

          const existingUser = await getUserByEmail(email);

          if (!existingUser || !existingUser.hashedPassword) return null;

          const passwordMatch = await bcrypt.compare(
            password,
            existingUser.hashedPassword
          );

          if (passwordMatch) return existingUser;
        }
        return null;
      },
    }),
    Google,
  ],
} satisfies NextAuthConfig;
