import React from "react";
import prisma from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Charts from "../components/Charts";
import {
  calculateLineChartData,
  calculateSummaryData,
} from "@/utils/statsUtils";

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
  const summaryData = calculateSummaryData(allGoals);
  const lineChartData = calculateLineChartData(allGoals);

  return (
    <>
      <section className="content">
        <h1>My stats</h1>
        <section className="statSummarySection">
          <p>Amount of added goals: {summaryData.totalGoals}</p>
          <p>Completed goals: {summaryData.completedGoals}</p>
          <p>
            Percentage of completed goals:{" "}
            {summaryData.completedPercentage.toFixed(2)}%
          </p>
          <p>Amount of money saved: {summaryData.totalSaved}</p>
        </section>
        <Charts summaryData={summaryData} lineChartData={lineChartData} />
      </section>
    </>
  );
};

export default Page;
