// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   if (!token) {
//     console.log("No token found, redirecting...");
//     return NextResponse.redirect(new URL("/", req.url), {
//       headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
//     });
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard", "/goals", "/badges", "/stats", "/profile"],
// };
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["https://tinysaves.vercel.app", "https://*.vercel.app"]; // Allow Vercel preview domains
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function middleware(req: NextRequest) {
  const isPreflight = req.method === "OPTIONS";

  const origin = req.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    console.log("No token found, redirecting...");
    return NextResponse.redirect(new URL("/", req.url), {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard",
    "/goals",
    "/badges",
    "/stats",
    "/profile",
  ],
};
