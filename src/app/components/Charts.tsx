"use client";

import React from "react";
import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(...registerables);

interface ChartProps {
  completedGoals: number;
  totalGoals: number;
  totalSaved: number;
  completedPercentage: number;
}

const Charts = ({
  completedGoals,
  totalGoals,
  totalSaved,
  completedPercentage,
}: ChartProps) => {
  const test = {
    labels: ["Not completed", "Completed"],
    datasets: [
      {
        label: "Goals Completion",
        data: [completedGoals, totalGoals - completedGoals],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <>
      <div className="doughnutChartContainer">
        <Doughnut data={test} />
      </div>
    </>
  );
};

export default Charts;
