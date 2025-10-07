import prisma from "@/app/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const userSettings = await prisma.userSettings.findFirst({
      where: { userId },
    });

    return NextResponse.json(
      { userSettings },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    const userId = session?.user.id;

    const { theme } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "Invalid user data" },
        { status: 422 }
      );
    }

    const themeSettings = await prisma.userSettings.update({
      where: { userId },
      data: { theme },
    });

    return NextResponse.json(
      {
        message: "Theme updated",
        userSettings: {
          ...themeSettings,
          id: themeSettings.userId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
