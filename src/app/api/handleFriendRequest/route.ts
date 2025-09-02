import prisma from "@/app/db";
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

export async function PATCH(req: NextRequest) {
  try {
    const { userChoice, notificationId } = await req.json();
    if (!userChoice || !notificationId) {
      return NextResponse.json(
        { error: "Missing userChoice or notificationId" },
        { status: 400 }
      );
    }

    const updatedNotification = await prisma.notifications.update({
      where: { notificationId },
      data: { status: userChoice },
    });

    if (
      !updatedNotification ||
      !updatedNotification.userId ||
      !updatedNotification.fromUserId
    ) {
      return NextResponse.json({ error: "Invalid users" }, { status: 400 });
    }

    const toUser = await prisma.user.findUnique({
      where: { userId: updatedNotification.fromUserId },
      select: { name: true },
    });
    const fromUser = await prisma.user.findUnique({
      where: { userId: updatedNotification.userId },
      select: { name: true },
    });

    if (!toUser || !fromUser) {
      return NextResponse.json({ error: "Users not found" }, { status: 404 });
    }

    const responseMessage =
      userChoice === "accepted"
        ? `✅ ${fromUser.name} accepted your friend request`
        : `❌ ${fromUser.name} declined your friend request`;

    const newNotification = await prisma.notifications.create({
      data: {
        userId: updatedNotification.fromUserId,
        fromUserId: updatedNotification.userId,
        type: "friend_request_response",
        message: responseMessage,
        status: "none",
        isRead: false,
      },
    });

    await pusher.trigger("friend-requests", "friend-request-updated", {
      to: toUser.name,
      from: fromUser.name,
      notification: newNotification,
    });

    return NextResponse.json(
      { message: "Friend request updated", updatedNotification },
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
