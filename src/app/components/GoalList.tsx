"use client";

import { Goals } from "@prisma/client";
import GoalCard from "./GoalCard";
import { useState } from "react";

interface GoalListProps {
  goals: Goals[];
}

const GoalList = ({ goals }: GoalListProps) => {
  const [savingGoals, setGoals] = useState<Goals[]>(goals);
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const deleteGoal = async (deletedGoalId: string) => {
    try {
      const updatedGoals = savingGoals.filter(
        (goal) => goal.goalId !== deletedGoalId
      );
      setGoals(updatedGoals);

      const response = await fetch(`${baseUrl}/api/goals`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goalId: deletedGoalId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete goal on server");
      }
    } catch (error) {
      console.error("Error deleting goal:", error);

      setGoals(goals);
    }
  };

  return (
    <>
      {savingGoals.map((goal) => (
        <GoalCard
          key={goal.goalId}
          goal={goal}
          deleteGoal={() => deleteGoal(goal.goalId)}
        ></GoalCard>
      ))}
    </>
  );
};

export default GoalList;
