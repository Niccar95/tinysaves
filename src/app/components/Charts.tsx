"use client";

import React from "react";
import { Chart, registerables } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

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
  const doughNutData = {
    labels: ["Completed", "Not completed"],
    datasets: [
      {
        label: "Goals",
        data: [completedGoals, totalGoals - completedGoals],
        backgroundColor: ["rgb(94, 214, 160)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  const lineData = {
    labels: lineChartData.labels,
    datasets: [
      {
        label: "Goals added by date",
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
        },
        title: {
          display: true,
          text: "Dates",
        },
      },
      y: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Goals",
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
