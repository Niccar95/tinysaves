import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { title, targetAmount, currency, dueDate, userId } = await req.json();
    if (!title || !targetAmount || !currency || !userId)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });

    const goal = await prisma.goals.create({
      data: {
        title,
        targetAmount,
        dueDate: dueDate ? new Date(dueDate) : null,
        progress: 0,
        currency,
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

export const DELETE = async (req: NextRequest) => {
  try {
    const { goalId } = await req.json();
    if (!goalId)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });

    const goal = await prisma.goals.delete({
      where: {
        goalId,
      },
    });
    return NextResponse.json(
      { message: "Successfully deleted savings goal", goal },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
