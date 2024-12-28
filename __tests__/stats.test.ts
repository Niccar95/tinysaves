import {
  calculateLineChartData,
  calculateSummaryData,
} from "@/utils/statsUtils";
import { Goals } from "@prisma/client";

describe("calculateSummaryData", () => {
  it("should return correct summary data for a list of goals", () => {
    const allGoals: Goals[] = [
      {
        goalId: "1",
        title: "Goal 1",
        targetAmount: 100,
        dueDate: new Date("2024-12-31"),
        progress: 50,
        currency: "USD",
        isComplete: true,
        userId: "user1",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
      },
      {
        goalId: "2",
        title: "Goal 2",
        targetAmount: 200,
        dueDate: new Date("2024-12-31"),
        progress: 30,
        currency: "USD",
        isComplete: false,
        userId: "user1",
        createdAt: new Date("2024-01-02"),
        updatedAt: new Date("2024-01-02"),
      },
      {
        goalId: "3",
        title: "Goal 3",
        targetAmount: 150,
        dueDate: new Date("2024-12-31"),
        progress: 70,
        currency: "USD",
        isComplete: true,
        userId: "user1",
        createdAt: new Date("2024-01-03"),
        updatedAt: new Date("2024-01-03"),
      },
    ];

    const result = calculateSummaryData(allGoals);

    expect(result.completedGoals).toBe(2);
    expect(result.totalGoals).toBe(3);
    expect(result.completedPercentage).toBeCloseTo(66.67, 2);
  });

  it("should handle an empty array of goals", () => {
    const allGoals: Goals[] = [];

    const result = calculateSummaryData(allGoals);

    expect(result.completedGoals).toBe(0);
    expect(result.totalGoals).toBe(0);
    expect(result.completedPercentage).toBe(0);
  });

  it("should handle goals with no completed progress", () => {
    const allGoals: Goals[] = [
      {
        goalId: "1",
        title: "Goal 1",
        targetAmount: 100,
        dueDate: new Date("2024-12-31"),
        progress: 0,
        currency: "USD",
        isComplete: false,
        userId: "user1",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
      },
      {
        goalId: "2",
        title: "Goal 2",
        targetAmount: 200,
        dueDate: new Date("2024-12-31"),
        progress: 0,
        currency: "USD",
        isComplete: false,
        userId: "user1",
        createdAt: new Date("2024-01-02"),
        updatedAt: new Date("2024-01-02"),
      },
    ];

    const result = calculateSummaryData(allGoals);

    expect(result.completedGoals).toBe(0);
    expect(result.totalGoals).toBe(2);
    expect(result.completedPercentage).toBe(0);
  });
});

describe("calculateLineChartData", () => {
  it("should return correct line chart data", () => {
    const allGoals: Goals[] = [
      {
        goalId: "1",
        title: "Goal 1",
        targetAmount: 100,
        dueDate: new Date("2024-12-31"),
        progress: 50,
        currency: "USD",
        isComplete: true,
        userId: "user1",
        createdAt: new Date("2024-12-01"),
        updatedAt: new Date("2024-12-01"),
      },
      {
        goalId: "2",
        title: "Goal 2",
        targetAmount: 200,
        dueDate: new Date("2024-12-31"),
        progress: 30,
        currency: "USD",
        isComplete: false,
        userId: "user1",
        createdAt: new Date("2024-12-01"),
        updatedAt: new Date("2024-12-01"),
      },
      {
        goalId: "3",
        title: "Goal 3",
        targetAmount: 150,
        dueDate: new Date("2024-12-31"),
        progress: 70,
        currency: "USD",
        isComplete: true,
        userId: "user1",
        createdAt: new Date("2024-12-02"),
        updatedAt: new Date("2024-12-02"),
      },
    ];

    const result = calculateLineChartData(allGoals);

    expect(result.labels).toEqual(["12/1/2024", "12/2/2024"]);
    expect(result.values).toEqual([2, 1]);
  });

  it("should handle an empty array of goals", () => {
    const allGoals: Goals[] = [];

    const result = calculateLineChartData(allGoals);

    expect(result.labels).toEqual([]);
    expect(result.values).toEqual([]);
  });
});
