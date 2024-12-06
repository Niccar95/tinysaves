"use client";

import React from "react";
import { Chart, registerables } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

Chart.register(...registerables);

interface ChartProps {
  summaryData: {
    completedGoals: number;
    totalGoals: number;
    totalSaved: number;
    completedPercentage: number;
  };
  lineChartData: {
    labels: string[];
    values: number[];
  };
}

const Charts = ({ summaryData, lineChartData }: ChartProps) => {
  const { completedGoals, totalGoals } = summaryData;
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

  const lineData = {
    labels: lineChartData.labels,
    datasets: [
      {
        label: "Added goals by date",
        data: lineChartData.values,
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
