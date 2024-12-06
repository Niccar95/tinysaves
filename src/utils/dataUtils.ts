import { Goals } from "@prisma/client";

export const calculateSummaryData = (allGoals: Goals[]) => {
  const completedGoals = allGoals.filter((goal) => goal.isComplete);
  const completedPercentage = (completedGoals.length / allGoals.length) * 100;
  const totalSaved = allGoals.reduce((total, goal) => total + goal.progress, 0);

  return {
    completedGoals: completedGoals.length,
    totalGoals: allGoals.length,
    completedPercentage,
    totalSaved,
  };
};

export const calculateLineChartData = (allGoals: Goals[]) => {
  const creationDates = allGoals.map((goal) =>
    new Date(goal.createdAt).toLocaleDateString()
  );

  const dateCounts = creationDates.reduce(
    (total: { [key: string]: number }, date: string) => {
      total[date] = (total[date] || 0) + 1;
      return total;
    },
    {} as { [key: string]: number }
  );

  return {
    labels: Object.keys(dateCounts),
    values: Object.values(dateCounts),
  };
};
