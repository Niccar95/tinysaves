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
import ConversionSelect from "../components/ConversionSelect";
import { getTranslations } from "next-intl/server";

const StatsPage = async () => {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("pages");

  const ts = await getTranslations("stats");

  if (!session) {
    redirect("/");
  }

  const userId = session.user.id;

  const allGoals = await prisma.goals.findMany({
    where: { userId },
  });
  const summaryData = calculateSummaryData(allGoals);
  const lineChartData = calculateLineChartData(allGoals);
  const goalMoneyData = await prisma.goals.findMany({
    where: { userId },
    select: { currency: true, progress: true, targetAmount: true },
  });

  const reachedMilestones = await prisma.userMilestones.findMany({
    where: { userId },
  });

  return (
    <>
      <section className="content">
        <h1>{t("myStats")}</h1>
        <section className="statSummarySection">
          <h2>{ts("title")}</h2>
          <p>
            <span className="boldLabel">{ts("addedGoals")}</span>{" "}
            {summaryData.totalGoals}
          </p>
          <p>
            <span className="boldLabel">{ts("completedGoals")}</span>{" "}
            {summaryData.completedGoals}
          </p>
          <p>
            <span className="boldLabel">{ts("completedPercentage")}</span>{" "}
            {summaryData.completedPercentage.toFixed(2)}%
          </p>

          <p>
            <span className="boldLabel">{ts("reachedMilestones")}</span>{" "}
            {reachedMilestones.length}
          </p>

          <ConversionSelect goalMoneyData={goalMoneyData} />
        </section>
        <Charts summaryData={summaryData} lineChartData={lineChartData} />
      </section>
    </>
  );
};

export default StatsPage;
