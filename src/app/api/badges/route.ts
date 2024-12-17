import prisma from "@/app/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session || !session.user) {
      return { error: "Unauthorized" };
    }

    const userId = session.user.id;

    if (!userId)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });

    const latestBadge = await prisma.userBadges.findFirst({
      where: { userId: userId },
      include: {
        badge: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!latestBadge) {
      return NextResponse.json(
        { message: "No badge found for this user" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Badge found", latestBadge },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
