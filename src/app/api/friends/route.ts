import prisma from "@/app/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
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

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const friendships = await prisma.friendship.findMany({
      where: {
        userId: userId,
      },
      include: {
        friend: {
          select: {
            userId: true,
            name: true,
            displayName: true,
            image: true,
          },
        },
      },
    });

    const friends = friendships.map((friendship) => friendship.friend);

    return NextResponse.json({ friends }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { friendUsername } = await req.json();

    if (!friendUsername) {
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });
    }

    const senderId = session.user.id;

    const recipientUser = await prisma.user.findFirst({
      where: {
        name: friendUsername,
        NOT: { userId: senderId },
      },
    });

    if (!recipientUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId: senderId, friendId: recipientUser.userId },
          { userId: recipientUser.userId, friendId: senderId },
        ],
      },
    });

    if (existingFriendship) {
      return NextResponse.json(
        { message: "Friendship already exists" },
        { status: 400 }
      );
    }

    const existingNotification = await prisma.notifications.findFirst({
      where: {
        userId: recipientUser.userId,
        fromUserId: senderId,
        type: "friend_request",
        status: "pending",
      },
    });

    if (existingNotification) {
      return NextResponse.json(
        { message: "Friend request already sent" },
        { status: 400 }
      );
    }

    const notification = await prisma.notifications.create({
      data: {
        userId: recipientUser.userId,
        fromUserId: senderId,
        type: "friend_request",
        message: `${session.user.name} sent you a friend request`,
        status: "pending",
        isRead: false,
      },
    });

    await pusher.trigger("friend-requests", "new-friend-request", {
      to: recipientUser.name,
      from: session.user.name,
      notification,
    });

    return NextResponse.json(
      { message: "Friend request sent", notification },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
        ? `${fromUser.name} accepted your friend request`
        : `${fromUser.name} declined your friend request`;

    const newNotification = await prisma.notifications.create({
      data: {
        userId: updatedNotification.fromUserId,
        fromUserId: updatedNotification.userId,
        type: "friend_request_response",
        message: responseMessage,
        status: userChoice,
        isRead: false,
      },
    });

    if (userChoice === "accepted") {
      await prisma.$transaction([
        prisma.friendship.create({
          data: {
            userId: updatedNotification.fromUserId,
            friendId: updatedNotification.userId,
          },
        }),
        prisma.friendship.create({
          data: {
            userId: updatedNotification.userId,
            friendId: updatedNotification.fromUserId,
          },
        }),
      ]);
    }

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
};
