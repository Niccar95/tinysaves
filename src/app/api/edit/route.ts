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

    const { displayName, image, userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "Invalid user data" },
        { status: 422 }
      );
    }

    const updateData: { displayName?: string; image?: string } = {};

    if (displayName) updateData.displayName = displayName;
    if (image) updateData.image = image;

    const userDetails = await prisma.user.update({
      where: { userId },
      data: updateData,
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

export const DELETE = async (req: NextRequest) => {
  try {
    const { userId } = await req.json();
    if (!userId)
      return NextResponse.json({ message: "Invalid userId" }, { status: 422 });

    const result = await prisma.$transaction([
      prisma.userSettings.delete({ where: { userId: userId } }),
      prisma.user.delete({ where: { userId: userId } }),
    ]);

    return NextResponse.json(
      { message: "Successfully deleted account", result },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
