import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function PATCH(req: NextRequest) {
  try {
    const { userChoice, notificationId } = await req.json();
    if (!userChoice || !notificationId) {
      return NextResponse.json(
        { error: "Failed to get friend request data" },
        { status: 400 }
      );
    }

    const updatedNotification = await prisma.notifications.update({
      where: { notificationId },
      data: { status: userChoice },
    });

    pusher.trigger("friend-requests", "friend-request-updated", {
      to: updatedNotification.fromUserId,
      from: updatedNotification.userId,
      notification: updatedNotification,
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
