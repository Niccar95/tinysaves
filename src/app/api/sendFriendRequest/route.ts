import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";
import Pusher from "Pusher";

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
    const { toUserName, fromUserName } = await req.json();
    if (!toUserName || !fromUserName) {
      return NextResponse.json({ error: "Missing usernames" }, { status: 400 });
    }

    const toUser = await prisma.user.findUnique({
      where: { name: toUserName },
      select: { userId: true },
    });
    if (!toUser) {
      return NextResponse.json(
        { error: "Recipient not found" },
        { status: 404 }
      );
    }

    const fromUser = await prisma.user.findUnique({
      where: { name: fromUserName },
      select: { userId: true },
    });
    if (!fromUser) {
      return NextResponse.json({ error: "Sender not found" }, { status: 404 });
    }

    const notification = await prisma.notifications.create({
      data: {
        userId: toUser.userId,
        fromUserId: fromUser.userId,
        type: "friend_request",
        message: `${fromUserName} sent you a friend request`,
        status: "pending",
        isRead: false,
      },
    });

    await pusher.trigger("friend-requests", "new-friend-request", {
      to: toUserName,
      from: fromUserName,
      notification,
    });

    return NextResponse.json(
      { message: "Friend request sent", notification },
      { status: 200 }
    );
  } catch (error) {
    console.error("Pusher trigger error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
