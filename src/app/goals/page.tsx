import React from "react";
import GoalList from "../components/GoalList";
import { getServerSession } from "next-auth";
import prisma from "../db";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const GoalsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;

  const goals = await prisma.goals.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const latestMilestone = await prisma.milestones.findFirst({
    orderBy: { createdAt: "desc" },
  });

  const milestoneId = latestMilestone?.milestoneId || null;

  return (
    <>
      <section className="content">
        <h1>My goals</h1>
        <GoalList goals={goals} milestoneId={milestoneId} />
      </section>
    </>
  );
};

export default GoalsPage;
