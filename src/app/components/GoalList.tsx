"use client";

import { Goals } from "@prisma/client";
import GoalCard from "./GoalCard";
import { useState } from "react";
import { deleteGoal } from "../services/goalService";

interface GoalListProps {
  goals: Goals[];
}

const GoalList = ({ goals }: GoalListProps) => {
  const [savingGoals, setGoals] = useState<Goals[]>(goals);

  const handleDeleteGoal = async (deletedGoalId: string) => {
    try {
      await deleteGoal(deletedGoalId);

      const updatedGoals = savingGoals.filter(
        (goal) => goal.goalId !== deletedGoalId
      );
      setGoals(updatedGoals);
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
              handleDeleteGoal={() => handleDeleteGoal(goal.goalId)}
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
