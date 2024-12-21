import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    console.log("No token found, redirecting...");
    return NextResponse.redirect(new URL("/", req.url), {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/goals",
    "/milestones",
    "/stats",
    "/profile",
    "/profile/edit",
    "/settings",
  ],
};
