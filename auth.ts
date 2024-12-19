import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getAccountByUserId, getUserByID } from "./data/user";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      role: "Superadmin" | "Administrator" | "User";
      id: string;
      image: string;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
      emailIsVerified: boolean;
      status: "Activated" | "Pending" | "Deactivated";
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  debug: process.env.NODE_ENV === "development",
  // skipCSRFCheck: process.env.NODE_ENV === "development" ? skipCSRFCheck : undefined,
  // cookies:{
  // },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      db.user
        .update({
          where: {
            id: user.id,
          },
          data: {
            emailVerified: new Date(),
          },
        })
        .catch((error) => console.error("Error linking account:", error));
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth sign-ins
      if (account?.provider !== "credentials") return true;
      try {
        console.log("getting user");
        const existingUser = await getUserByID(user.id!);

        // Add custom validation logic if needed, such as email verification
        // Example: Reject if email is not verified
        // if (!existingUser?.emailVerified) return false;

        return !!existingUser; // Only allow sign-in if the user exists
      } catch (error) {
        console.error("Error during sign-in callback:", error);
        return false; // Deny sign-in on error
      }
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
          role: token.role as UserRole,
          isTwoFactorEnabled: token.isTwoFactorEnabled as boolean,
          isOAuth: token.isOAuth as boolean,
          name: token.name,
          email: token.email!,
          image: token.picture!,
        };
      }
      // if (token.sub && session.user) {
      //   session.user.id = token.sub;
      // }
      // if (token.role && session.user) {
      //   session.user.role = token.role as UserRole;
      // }
      // if (token.isTwoFactorEnabled && session.user) {
      //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      // }

      // if (session.user) {
      //   session.user.name = token.name;
      //   session.user.email = token.email as string;
      //   session.user.isOAuth = token.isOAuth as boolean;
      //   session.user.image = token.picture as string;
      // }
      // console.log(session);
      // console.log(token);
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      try {
        const user = await getUserByID(token.sub);
        if (user) {
          token = {
            ...token,
            name: user.name,
            email: user.email,
            picture: user.image,
            role: user.role,
            isTwoFactorEnabled: user.isTwoFactorEnabled,
            isOAuth: !!(await getAccountByUserId(user.id)),
          };
        }
        return token;
      } catch (error) {
        console.error("Error in jwt callback:", error);
        return token;
      }
      // const existingUser = await getUserByID(token.sub);

      // if (!existingUser) return token;

      // const existingAccount = await getAccountByUserId(existingUser.id);

      // // Check if existingAccount is not null or undefined
      // if (existingAccount !== null && existingAccount !== undefined) {
      //   token.isOAuth = true;
      // } else {
      //   token.isOAuth = false;
      // }

      // token.name = existingUser.name;
      // token.email = existingUser.email;
      // token.picture = existingUser.image;
      // token.role = existingUser.role;
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      // return token;
    },
    // authorized: () => {
    //   return true;
    // },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;

      // const parsedUrl = new URL(url, baseUrl);
      // if (parsedUrl.searchParams.has("callbackUrl")) {
      //   return `${baseUrl}${parsedUrl.searchParams.get("callbackUrl")}`;
      // }
      // if (parsedUrl.origin === baseUrl) {
      //   return url;
      // }
      // return baseUrl;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
