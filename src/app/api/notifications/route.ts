import prisma from "@/app/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  try {
    if (!userId) {
      return NextResponse.json({ notifications: [] }, { status: 200 });
    }

    const notifications = await prisma.notifications.findMany({
      where: { userId: session?.user.id },
      orderBy: { createdAt: "desc" },
    });

    if (notifications.length === 0) {
      return NextResponse.json({ notifications: [] }, { status: 200 });
    } else {
      return NextResponse.json({ notifications }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
