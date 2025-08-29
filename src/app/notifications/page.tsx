import React from "react";
import prisma from "../db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NotificationsPageClient from "../components/NotificationsPageClient";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;

  const notifications = await prisma.notifications.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="content">
      <NotificationsPageClient initialNotifications={notifications} />
    </section>
  );
};

export default page;
