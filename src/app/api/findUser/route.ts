import prisma from "@/app/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;

    const userName = searchParams.get("userName");

    if (!userName)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });

    const session = await getServerSession({ req, ...authOptions });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const foundUser = await prisma.user.findFirst({
      where: {
        name: userName,
        NOT: { userId },
      },
      select: {
        name: true,
        image: true,
      },
    });

    if (!foundUser) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(foundUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
