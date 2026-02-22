"use client";

import React, { useContext } from "react";
import { Chart, registerables } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useTranslations } from "next-intl";
import { ThemeContext } from "@/app/contexts/ThemeContext";

Chart.register(...registerables);

interface ChartProps {
  summaryData: {
    completedGoals: number;
    totalGoals: number;
    completedPercentage: number;
  };
  lineChartData: {
    labels: string[];
    values: number[];
  };
}

const Charts = ({ summaryData, lineChartData }: ChartProps) => {
  const { completedGoals, totalGoals } = summaryData;
  const { trackedTheme } = useContext(ThemeContext);
  const isDark = trackedTheme === "dark";
  const gridColor = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)";
  const tickColor = isDark ? "#64748b" : "#94a3b8";

  const t = useTranslations("stats.charts");
  const doughNutData = {
    labels: [`${t("completed")}`, `${t("notCompleted")}`],
    datasets: [
      {
        label: `${t("goals")}`,
        data: [completedGoals, totalGoals - completedGoals],
        backgroundColor: [isDark ? "#34d399" : "#10b981", isDark ? "#334155" : "#e2e8f0"],
        hoverOffset: 4,
      },
    ],
  };

  const lineData = {
    labels: lineChartData.labels,
    datasets: [
      {
        label: `${t("addedByDate")}`,
        data: lineChartData.values,
        fill: true,
        stepped: true,
        borderColor: "rgb(75, 118, 192)",
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
          color: tickColor,
        },
        grid: { color: gridColor },
        title: {
          display: true,
          text: `${t("dates")}`,
          color: tickColor,
        },
      },
      y: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          stepSize: 1,
          color: tickColor,
        },
        grid: { color: gridColor },
        title: {
          display: true,
          text: `${t("goals")}`,
          color: tickColor,
        },
        min: 0,
        max: 10,
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <section className="chartSection">
        <div className="doughnutChartContainer">
          <Doughnut data={doughNutData} />
        </div>
        <div className="lineChartContainer">
          <Line data={lineData} options={lineChartOptions} />
        </div>
      </section>
    </>
  );
};

export default Charts;
