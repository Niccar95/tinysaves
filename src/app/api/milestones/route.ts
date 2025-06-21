import prisma from "@/app/db";
import { authOptions } from "@/lib/auth";
import { ensureMilestonesExist } from "@/lib/seedMilestones";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async () => {
  await ensureMilestonesExist();
  return NextResponse.json({ status: "ok" });
};

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    if (!userId)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });

    const latestMilestone = await prisma.userMilestones.findFirst({
      where: { userId: userId },
      include: {
        milestone: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!latestMilestone) {
      return NextResponse.json(
        { message: "No milestone for this user" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Milestone found",
        latestMilestone: latestMilestone.milestone,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
