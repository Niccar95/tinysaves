import React from "react";
import prisma from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Charts from "../components/Charts";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <h1>Please log in to view your stats</h1>
      </div>
    );
  }

  const userId = session.user?.id;

  if (!userId) {
    return (
      <div>
        <h1>Error: Unable to retrieve user ID</h1>
      </div>
    );
  }

  const allGoals = await prisma.goals.findMany({ where: { userId } });
  const completedGoals = allGoals.filter((goal) => goal.isComplete);
  const completedPercentage = (completedGoals.length / allGoals.length) * 100;
  const totalSaved = allGoals.reduce((total, goal) => total + goal.progress, 0);

  console.log(allGoals);

  return (
    <>
      <section className="content">
        <h1>My stats</h1>
        <h2>Amount of added goals: {allGoals.length}</h2>
        <h2>Completed goals: {completedGoals.length}</h2>
        <h2>Percentage of completed goals: {completedPercentage}</h2>
        <h2>Amount of money saved: {totalSaved}</h2>
        <Charts
          completedGoals={completedGoals.length}
          totalGoals={allGoals.length}
          totalSaved={totalSaved}
          completedPercentage={completedPercentage}
        />
      </section>
    </>
  );
};

export default Page;
