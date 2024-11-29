import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId is required" },
        { status: 400 }
      );
    }

    const goals = await prisma.goals.findMany({ where: { userId } });

    return NextResponse.json(goals);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { title, targetAmount, dueDate, userId } = await req.json();
    if (!title || !targetAmount || !userId)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });

    const goal = await prisma.goals.create({
      data: {
        title,
        targetAmount,
        dueDate: dueDate ? new Date(dueDate) : null,
        progress: 0,
        isComplete: false,
        userId: userId,
      },
    });
    return NextResponse.json(
      { message: "New savings goal was created", goal },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
