"use client";

import React from "react";
import { Chart, registerables } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

Chart.register(...registerables);

interface ChartProps {
  completedGoals: number;
  totalGoals: number;
  totalSaved: number;
  completedPercentage: number;
  creationDates: string[];
}

const Charts = ({
  completedGoals,
  totalGoals,
  totalSaved,
  completedPercentage,
  creationDates,
}: ChartProps) => {
  const doughNutData = {
    labels: ["Completed", "Not completed"],
    datasets: [
      {
        label: "Goals",
        data: [completedGoals, totalGoals - completedGoals],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  const dateCounts = creationDates.reduce(
    (acc: { [key: string]: number }, date: string) => {
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  const lineLabels = Object.keys(dateCounts);
  const lineDataValues = Object.values(dateCounts);

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: "Added goals",
        data: lineDataValues,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <section className="chartSection">
        <div className="doughnutChartContainer">
          <Doughnut data={doughNutData} />
        </div>

        <div className="lineChartContainer">
          <Line data={lineData} />
        </div>
      </section>
    </>
  );
};

export default Charts;
