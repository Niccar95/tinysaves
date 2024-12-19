"use client";

import { Goals } from "@prisma/client";
import GoalCard from "./GoalCard";
import { useState } from "react";
import { fetchLatestBadge } from "../services/badgeService";

interface GoalListProps {
  goals: Goals[];
}

const GoalList = ({ goals }: GoalListProps) => {
  const [savingGoals, setGoals] = useState<Goals[]>(goals);
  const baseUrl =
    process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000";

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
      <div className="goalListWrapper">
        {savingGoals.length > 0 ? (
          savingGoals.map((goal) => (
            <GoalCard
              key={goal.goalId}
              goal={goal}
              deleteGoal={() => deleteGoal(goal.goalId)}
            ></GoalCard>
          ))
        ) : (
          <p>No goals available</p>
        )}
      </div>
    </>
  );
};

export default GoalList;
