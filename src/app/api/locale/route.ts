import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "NEXT_LOCALE";

export async function POST(req: NextRequest) {
  const { locale } = await req.json();

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: COOKIE_NAME,
    value: locale,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
