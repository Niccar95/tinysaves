"use client";

import { Goals, Milestones } from "@prisma/client";
import GoalCard from "./GoalCard";
import { useState } from "react";
import { deleteGoal, editGoalTitle } from "@/services/goalService";
import { fetchLatestMilestone } from "@/services/milestoneService";
import MilestoneModal from "./MilestoneModal";
interface GoalListProps {
  goals: Goals[];
}

const GoalList = ({ goals }: GoalListProps) => {
  const [savingGoals, setGoals] = useState<Goals[]>(goals);
  const [latestMilestone, setLatestMilestone] = useState<Milestones | null>(
    null
  );

  const handleMilestoneReached = async () => {
    try {
      const fetchedMilestone = await fetchLatestMilestone();
      if (fetchedMilestone) {
        setLatestMilestone(fetchedMilestone);
      }
    } catch (error) {
      console.error("Error fetching milestone:", error);
    }
  };

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

  const handleEditGoalTitle = async (goalId: string, newTitle: string) => {
    try {
      await editGoalTitle(goalId, newTitle);

      setGoals(
        goals.map((goal) =>
          goal.goalId === goalId ? { ...goal, title: newTitle } : goal
        )
      );
    } catch (error) {
      console.error("Failed to update goal title:", error);
    }
  };

  return (
    <>
      <div className="goalListWrapper">
        {latestMilestone && (
          <MilestoneModal
            latestMilestone={latestMilestone}
            onClose={() => setLatestMilestone(null)}
          />
        )}

        {savingGoals.length > 0 ? (
          savingGoals.map((goal) => (
            <GoalCard
              key={goal.goalId}
              goal={goal}
              handleDeleteGoal={() => handleDeleteGoal(goal.goalId)}
              handleEditGoalTitle={handleEditGoalTitle}
              onMilestoneReached={handleMilestoneReached}
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
