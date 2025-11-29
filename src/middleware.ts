import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes (require authentication)
const isProtectedRoute = createRouteMatcher([
  '/editor(.*)', // Protect editor and sub-pages
]);

// Public routes that should NOT require auth (webhooks use their own signature verification)
const isPublicRoute = createRouteMatcher([
  '/api/webhooks(.*)', // Webhooks verify via signature, not Clerk
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip auth for public routes (webhooks)
  if (isPublicRoute(req)) return;
  
  // Require auth for protected routes
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

