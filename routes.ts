/**
 * An array of routes that are accesible to the public
 * These routes do no require authentication
 * @type {string[]}
 */

export const guestRoutes = [
  "/auth/forgot-password",
  "/auth/login",
  "/auth/reset-password",
  "/auth/sign-up",
  "/auth/verify-code",
  "/api/uploadthing",
  "/auth/error",
];

export const sharedRoutes = ["shared-routes"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to "/dashboard"
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/forgot-password",
  "/auth/login",
  "/auth/reset-password",
  "/auth/sign-up",
  "/auth/verify-code",
];

/**
 * The prefix for API authentication routes
 * Routes that starts with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
