import prisma from "@/app/db";
import { createMilestones } from "@/services/milestoneService";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const { goalId, progress, targetAmount, userId } = await req.json();

    if (!goalId || progress === undefined || !targetAmount || !userId) {
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });
    }

    const currentGoal = await prisma.goals.findUnique({
      where: { goalId },
      select: { progress: true },
    });

    if (!currentGoal) {
      return NextResponse.json({ message: "Goal not found" }, { status: 404 });
    }

    const updatedProgress = currentGoal.progress + progress;

    const milestone = await createMilestones(
      userId,
      updatedProgress,
      targetAmount
    );

    const goal = await prisma.goals.update({
      where: { goalId },
      data: {
        progress: updatedProgress,
        isComplete: updatedProgress >= targetAmount,
      },
    });

    return NextResponse.json(
      { message: "Savings goal updated", goal, milestone },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
