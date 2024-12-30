"use client";

import { Goals } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import SavingsForm from "./SavingsForm";
import Spinner from "./Spinner";
import GoalCardContent from "./GoalCardContent";
import { getLatestGoal } from "@/services/goalService";

interface LatestGoalProps {
  userId: string;
}

const LatestGoalCard = ({ userId }: LatestGoalProps) => {
  const [latestGoal, setLatestGoal] = useState<Goals | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasGoals, setHasGoals] = useState<boolean>(true);

  const fetchLatestGoal = useCallback(async () => {
    if (!hasGoals) return;

    setIsLoading(true);

    const goal = await getLatestGoal(userId);
    if (goal) {
      setLatestGoal(goal);
      setHasGoals(true);
    } else {
      setLatestGoal(null);
      setHasGoals(false);
    }

    setIsLoading(false);
  }, [userId, hasGoals]);

  useEffect(() => {
    fetchLatestGoal();
  }, [fetchLatestGoal]);

  const handleGoalSubmission = () => {
    setHasGoals(true);
    fetchLatestGoal();
  };

  return (
    <>
      <article className="latestCard">
        <SavingsForm onSubmitSuccess={handleGoalSubmission} />
        {isLoading && <Spinner />}
        {latestGoal && <GoalCardContent latestGoal={latestGoal} />}
        {!latestGoal && <p>No goals added yet</p>}
      </article>
    </>
  );
};

export default LatestGoalCard;
