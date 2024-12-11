import prisma from "@/app/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const { displayName, userId } = await req.json();

    if (!displayName || !userId) {
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });
    }

    const userDetails = await prisma.user.update({
      where: { userId },
      data: { displayName },
    });

    return NextResponse.json(
      {
        message: "User details updated",
        user: {
          ...userDetails,
          id: userDetails.userId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
