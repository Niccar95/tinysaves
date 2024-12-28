import { Goals } from "@prisma/client";

export const calculateSummaryData = (allGoals: Goals[]) => {
  if (allGoals.length === 0) {
    return {
      completedGoals: 0,
      totalGoals: 0,
      completedPercentage: 0,
    };
  }

  const completedGoals = allGoals.filter((goal) => goal.isComplete);
  const completedPercentage = (completedGoals.length / allGoals.length) * 100;

  return {
    completedGoals: completedGoals.length,
    totalGoals: allGoals.length,
    completedPercentage,
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
