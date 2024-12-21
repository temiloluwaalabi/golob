import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

import authConfig from "./auth.config";
import { getAccountByUserId, getUserByID } from "./data/user";
import { db } from "./lib/db";

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
    // async signIn({ user, account, profile }) {
    //   console.log("OAuth started");
    //   console.log("USER", user);
    //   console.log("ACCOUNT", account);
    //   console.log("PROFILE", profile);
    //   // Allow OAuth sign-ins
    //   if (account?.provider === "credentials") return true;
    //   if (!account || !user) return false;
    //   try {
    //     const userInfo = {
    //       name: user.name!,
    //       email: user.email!,
    //       image: user.image!,
    //       username:
    //         account.provider === "github"
    //           ? (profile?.preferred_username as string)
    //           : (user.name?.toLowerCase() as string),
    //     };
    //     console.log(userInfo);
    //     const { success } = (await api.auth.oAuthSignIn({
    //       user: userInfo,
    //       provider: account.provider as "github" | "google",
    //       providerAccountId: account.providerAccountId,
    //     })) as ActionResponse;

    //     if (!success) return false;

    //     return true;
    //   } catch (error) {
    //     console.error("Error during sign-in callback:", error);
    //     return false; // Deny sign-in on error
    //   }
    // },
    async signIn({ user, account }) {
      try {
        // Allow OAuth sign-ins
        if (account?.provider !== "credentials") return true;

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
      console.log("SESSION", token);
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
      return session;
    },
    async jwt({ token }) {
      // console.log("JWT", token);
      if (!token.sub) return token;
      // if (account) {
      //   // const {} = await
      // }
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
    },
    // authorized: async ({ request, auth }) => {
    //   try {
    //     const id = auth?.user.id;
    //     if (!id) {
    //       console.log("no id");
    //     }
    //   } catch (error) {
    //     console.error("Authorization check failed:", error);

    //     return false;
    //   }
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
