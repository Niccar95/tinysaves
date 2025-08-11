import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

const appId = process.env.PUSHER_APP_ID;
const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
const secret = process.env.PUSHER_SECRET;
const cluster = process.env.PUSHER_CLUSTER;

if (!appId || !key || !secret || !cluster) {
  throw new Error("Missing one or more required Pusher environment variables");
}

const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
  useTLS: true,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toUserName, fromUserName } = body;

    if (!toUserName || !fromUserName) {
      return NextResponse.json({ error: "Missing usernames" }, { status: 400 });
    }

    await pusher.trigger("friend-requests", "new-friend-request", {
      to: toUserName,
      from: fromUserName,
    });

    return NextResponse.json({ message: "Friend request sent" });
  } catch (error) {
    console.error("Pusher trigger error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
