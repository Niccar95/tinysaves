import { NextResponse } from "next/server";

let cachedRates: Record<string, number> | null = null;
let lastFetchTime = 0;

const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const GET = async () => {
  try {
    const now = Date.now();

    if (cachedRates && now - lastFetchTime < CACHE_DURATION) {
      return NextResponse.json({
        source: "cache",
        rates: cachedRates,
      });
    }

    const response = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_uOFw0YXqIEs7iS2a9pnRIASrrzilywYjqM5TwO44&currencies=USD,EUR,GBP,SEK`
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch rates" },
        { status: 500 }
      );
    }

    const data = await response.json();

    cachedRates = data.data;
    lastFetchTime = now;

    return NextResponse.json({
      source: "api",
      rates: cachedRates,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
