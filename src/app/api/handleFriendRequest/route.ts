import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { userChoice, notificationId } = await req.json();
    if (!userChoice || !notificationId) {
      return NextResponse.json(
        { error: "Failed to get friend request data" },
        { status: 400 }
      );
    }

    // const toUser = await prisma.user.findUnique({
    //   where: { name: notificationId },
    // });
    // if (!toUser) {
    //   return NextResponse.json(
    //     { error: "Recipient not found" },
    //     { status: 404 }
    //   );
    // }

    // const fromUser = await prisma.user.findUnique({
    //   where: { name: fromUserName },
    //   select: { userId: true },
    // });

    // if (!fromUser) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    const updatedNotification = await prisma.notifications.update({
      where: { notificationId },
      data: { status: userChoice },
    });

    // await pusher.trigger("friend-requests", "new-friend-request", {
    //   to: toUserName,
    //   from: fromUserName,
    //   notification,
    // });

    return NextResponse.json(
      { message: "Friend request sent", updatedNotification },
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
