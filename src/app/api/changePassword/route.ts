import prisma from "@/app/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const POST = async (req: Request) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = await req.json();

    if (!currentPassword || !newPassword || !confirmPassword)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "New passwords do not match." },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
      where: { userId: session?.user.id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.hashedPassword
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Incorrect current password." },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { userId: user.userId },
      data: {
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
