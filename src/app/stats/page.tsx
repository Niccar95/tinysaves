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

  const creationDates = allGoals.map((goal) =>
    new Date(goal.createdAt).toLocaleDateString()
  );

  console.log(allGoals);
  console.log(creationDates);

  return (
    <>
      <section className="content">
        <section className="statSummarySection">
          <h1>My stats</h1>
          <p>Amount of added goals: {allGoals.length}</p>
          <p>Completed goals: {completedGoals.length}</p>
          <p>Percentage of completed goals: {completedPercentage}</p>
          <p>Amount of money saved: {totalSaved}</p>
        </section>
        <Charts
          completedGoals={completedGoals.length}
          totalGoals={allGoals.length}
          totalSaved={totalSaved}
          completedPercentage={completedPercentage}
          creationDates={creationDates}
        />
      </section>
    </>
  );
};

export default Page;
