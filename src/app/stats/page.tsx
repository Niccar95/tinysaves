import React from "react";
import prisma from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Charts from "../components/Charts";
import {
  calculateLineChartData,
  calculateSummaryData,
} from "@/utils/statsUtils";
import { redirect } from "next/navigation";

const StatsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;

  const allGoals = await prisma.goals.findMany({ where: { userId } });
  const summaryData = calculateSummaryData(allGoals);
  const lineChartData = calculateLineChartData(allGoals);

  return (
    <>
      <section className="content">
        <h1>My stats</h1>
        <section className="statSummarySection">
          <h2>Complete overview</h2>
          <p>
            <span className="boldLabel">Your added goals:</span>{" "}
            {summaryData.totalGoals}
          </p>
          <p>
            <span className="boldLabel">Completed goals:</span>{" "}
            {summaryData.completedGoals}
          </p>
          <p>
            <span className="boldLabel"> Percentage of completed goals:</span>{" "}
            {summaryData.completedPercentage.toFixed(2)}%
          </p>
          {/* <p>
            <span className="boldLabel"> Amount of money saved: </span>{" "}
            {summaryData.totalSaved}
          </p> */}
        </section>
        <Charts summaryData={summaryData} lineChartData={lineChartData} />
      </section>
    </>
  );
};

export default StatsPage;
