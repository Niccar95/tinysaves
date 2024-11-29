import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { title, targetAmount, dueDate, userId } = await req.json();
    if (!title || !targetAmount || !dueDate)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });

    const goal = await prisma.goals.create({
      data: {
        title,
        targetAmount,
        dueDate,
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
