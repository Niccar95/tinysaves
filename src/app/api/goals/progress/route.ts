import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const { goalId, progress, targetAmount } = await req.json();

    if (!goalId || progress === undefined || !targetAmount) {
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

    const goal = await prisma.goals.update({
      where: { goalId },
      data: {
        progress: updatedProgress,
        isComplete: updatedProgress >= targetAmount,
      },
    });

    return NextResponse.json(
      { message: "Savings goal was updated", goal },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
