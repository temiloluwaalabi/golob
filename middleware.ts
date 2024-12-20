import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  guestRoutes,
  sharedRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;

  const pathname = nextUrl.pathname;
  const isLoggedIn = !!req.auth?.user.email;

  if (!req.auth?.user.id) {
    console.log("No ID");
  }
  console.log(isLoggedIn);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isGuestRoutes = guestRoutes.includes(nextUrl.pathname);
  // const isRequestedRouteGuestRoute = guestRoutes.some((route) =>
  //   pathname.endsWith(route)
  // );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const privateRoute = ![...guestRoutes, ...sharedRoutes].some((route) =>
    pathname.endsWith(route)
  );

  if (isApiAuthRoute) {
    return;
  }

  if (!isLoggedIn && privateRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // if (isLoggedIn) {
  //   try {
  //     const user = await getUserByEmail(req.auth?.user.email!);

  //     if (!user || !user.emailVerified || user.userStatus !== "Activated") {
  //       return Response.redirect(new URL("/auth/login", nextUrl));
  //     }
  //   } catch (error) {
  //     console.error("Error in middleware user check:", error);
  //     return Response.redirect(new URL("/auth/error", nextUrl));
  //   }
  // }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // if (isLoggedIn && pathname === "/") {
  //   return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  // }

  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
