import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // This function runs if user is authenticated
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Return true if user is authenticated
        return !!token;
      },
    },
    pages: {
      signIn: "/", // Redirect to home page if not authenticated
    },
  }
);

// Protect these routes
export const config = {
  matcher: [
    "/account/:path*",
    "/checkout/:path*",
  ],
};