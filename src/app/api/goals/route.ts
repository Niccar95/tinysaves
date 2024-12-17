import prisma from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (req: NextRequest) => {
//   try {
//     const { userId } = await req.json();

//     if (!userId)
//       return NextResponse.json({ message: "Invalid data" }, { status: 422 });

//     const allGoals = await prisma.goals.findMany({
//       where: { userId: userId },
//     });

//     if (!allGoals) {
//       return NextResponse.json(
//         { message: "No goals found for this user" },
//         { status: 200 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Goals found", allGoals },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// };

// export const GET = async (req: NextRequest) => {
//   try {
//     const { searchParams } = req.nextUrl;
//     const userId = searchParams.get("userId");

//     if (!userId)
//       return NextResponse.json({ message: "Invalid data" }, { status: 422 });

//     const latestGoal = await prisma.goals.findFirst({
//       where: { userId: userId },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     if (!latestGoal) {
//       return NextResponse.json(
//         { message: "No goal found for this user" },
//         { status: 200 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Goal found", latestGoal },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// };

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");
    const latest = searchParams.get("latest");

    if (!userId)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });

    if (latest === "true") {
      const latestGoal = await prisma.goals.findFirst({
        where: { userId: userId },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!latestGoal) {
        return NextResponse.json(
          { message: "No goal found for this user" },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: "Latest goal found", latestGoal },
        { status: 200 }
      );
    } else {
      const allGoals = await prisma.goals.findMany({
        where: { userId: userId },
      });

      return NextResponse.json(
        { message: "All goals found", allGoals },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

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
