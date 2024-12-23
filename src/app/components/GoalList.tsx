"use client";

import { Goals, Milestones } from "@prisma/client";
import GoalCard from "./GoalCard";
import { useState } from "react";
import { deleteGoal, editGoalTitle } from "@/services/goalService";
import { fetchLatestMilestone } from "@/services/milestoneService";
import MilestoneModal from "./MilestoneModal";
interface GoalListProps {
  goals: Goals[];
  milestoneId: string | null;
}

const GoalList = ({ goals, milestoneId }: GoalListProps) => {
  const [savingGoals, setGoals] = useState<Goals[]>(goals);
  const [currentMilestone, setCurrentMilestone] = useState<Milestones | null>(
    null
  );

  const [lastShownMilestoneId, setLastShownMilestoneId] = useState<
    string | null
  >(milestoneId);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleMilestoneReached = async () => {
    try {
      const fetchedMilestone = await fetchLatestMilestone();
      if (fetchedMilestone?.milestoneId !== lastShownMilestoneId) {
        setCurrentMilestone(fetchedMilestone);
        setLastShownMilestoneId(fetchedMilestone?.milestoneId || null);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching milestone:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        {isModalOpen && currentMilestone && (
          <MilestoneModal
            latestMilestone={currentMilestone}
            onClose={closeModal}
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
