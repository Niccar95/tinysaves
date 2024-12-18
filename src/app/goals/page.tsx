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

  return (
    <>
      <section className="content">
        <h1>My goals</h1>
        <GoalList goals={goals} />
      </section>
    </>
  );
};

export default GoalsPage;
