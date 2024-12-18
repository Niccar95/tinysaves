"use client";

import { Goals } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import SavingsForm from "./SavingsForm";
import Spinner from "./Spinner";
import GoalCardContent from "./GoalCardContent";

interface LatestGoalProps {
  userId: string;
}

const LatestGoalCard = ({ userId }: LatestGoalProps) => {
  const [latestGoal, setLatestGoal] = useState<Goals | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasGoals, setHasGoals] = useState<boolean>(true);

  const fetchLatestGoal = useCallback(async () => {
    if (!hasGoals) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/goals?userId=${userId}&latest=true`);
      const data = await response.json();

      if (response.ok && data.latestGoal) {
        setLatestGoal(data.latestGoal);
        setHasGoals(true);
      } else {
        setLatestGoal(null);
        setHasGoals(false);
      }
    } catch (err) {
      console.error("Error fetching latest goal:", err);
    } finally {
      setIsLoading(false);
    }
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
