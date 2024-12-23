import prisma from "@/app/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { email, newPassword, confirmPassword } = await req.json();
    if (!email || !newPassword || !confirmPassword)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });

    if (newPassword !== confirmPassword)
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 422 }
      );

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { userId: user.userId },
      data: {
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Password changed successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
