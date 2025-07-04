"use client";

import { Goals, Milestones } from "@prisma/client";
import GoalCard from "./GoalCard";
import { useEffect, useState } from "react";
import { deleteGoal, editGoalTitle } from "@/services/goalService";
import { fetchLatestMilestone } from "@/services/milestoneService";
import MilestoneModal from "./MilestoneModal";
import { motion } from "motion/react";
interface GoalListProps {
  goals: Goals[];
  milestoneId: string | null;
}

const GoalList = ({ goals, milestoneId }: GoalListProps) => {
  const [savingGoals, setSavingGoals] = useState<Goals[]>(goals);
  const [currentMilestone, setCurrentMilestone] = useState<Milestones | null>(
    null
  );

  const [lastShownMilestoneId, setLastShownMilestoneId] = useState<
    string | null
  >(milestoneId);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setSavingGoals(goals);
  }, [goals]);

  useEffect(() => {
    const fetchInitialMilestone = async () => {
      const fetchedMilestone = await fetchLatestMilestone();
      if (fetchedMilestone) {
        setLastShownMilestoneId(fetchedMilestone.milestoneId);
        setCurrentMilestone(fetchedMilestone);
      }
    };
    fetchInitialMilestone();
  }, []);

  const handleMilestoneReached = async () => {
    const fetchedMilestone = await fetchLatestMilestone();

    if (fetchedMilestone?.milestoneId !== lastShownMilestoneId) {
      setCurrentMilestone(fetchedMilestone);
      setLastShownMilestoneId(fetchedMilestone?.milestoneId || null);
      setIsModalOpen(true);
    }
  };

  const handleDeleteGoal = async (deletedGoalId: string) => {
    await deleteGoal(deletedGoalId);

    const updatedGoals = savingGoals.filter(
      (goal) => goal.goalId !== deletedGoalId
    );
    setSavingGoals(updatedGoals);
  };

  const handleEditGoalTitle = async (goalId: string, newTitle: string) => {
    await editGoalTitle(goalId, newTitle);

    setSavingGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.goalId === goalId ? { ...goal, title: newTitle } : goal
      )
    );
  };

  return (
    <>
      <div className="goalListWrapper">
        {isModalOpen && currentMilestone && (
          <MilestoneModal
            latestMilestone={currentMilestone}
            onClose={() => setIsModalOpen(!isModalOpen)}
          />
        )}

        {savingGoals.length > 0 ? (
          savingGoals.map((goal, i) => (
            <motion.div
              key={goal.goalId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: (i + 1) * 0.3,
              }}
            >
              <GoalCard
                goal={goal}
                handleDeleteGoal={() => handleDeleteGoal(goal.goalId)}
                handleEditGoalTitle={handleEditGoalTitle}
                onMilestoneReached={handleMilestoneReached}
              ></GoalCard>
            </motion.div>
          ))
        ) : (
          <p>No goals added yet.</p>
        )}
      </div>
    </>
  );
};

export default GoalList;
