import prisma from "@/app/db";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const {
      name,
      email,
      image,
      password = "",
      displayName = "",
    } = await req.json();

    if (!name || !password || !email)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });

    const existingUsername = await prisma.user.findUnique({
      where: { name },
    });

    if (existingUsername) {
      return NextResponse.json(
        { message: "Username is already taken." },
        { status: 409 }
      );
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: "Email is already taken." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        image: image || "",
        displayName: displayName || null,
        hashedPassword,
      },
    });
    return NextResponse.json(
      { message: "user was created", user },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
