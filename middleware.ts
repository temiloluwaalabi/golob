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

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isLoggedIn = !!req.auth;
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
