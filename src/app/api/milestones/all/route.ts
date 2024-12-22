// app/api/milestones/[goalId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db"; // Adjust path if needed

export const GET = async (
  req: NextRequest,
  { params }: { params: { goalId: string } }
) => {
  try {
    const { goalId } = params; // Access goalId from URL params

    if (!goalId || Array.isArray(goalId)) {
      return NextResponse.json({ message: "Invalid goal ID" }, { status: 400 });
    }

    // Fetch the milestone from your database using Prisma
    const milestone = await prisma.milestones.findFirst({
      where: {
        milestone: {
          goalId: goalId, // Ensure goalId is correctly used if there is a relation to the milestone
        },
      },
      include: {
        milestone: true, // This will include the milestone data from the Milestones table
      },
    });

    if (!milestone) {
      return NextResponse.json(
        { message: "Milestone not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(milestone, { status: 200 });
  } catch (error) {
    console.error("Error fetching milestone:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
