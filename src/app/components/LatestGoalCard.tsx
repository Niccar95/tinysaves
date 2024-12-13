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
      const response = await fetch(`/api/goals?userId=${userId}`);
      const data = await response.json();

      if (response.ok && data.latestGoal) {
        setLatestGoal(data.latestGoal);
        setHasGoals(true);
        console.log("Fetched latest goal:", data.latestGoal);
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
      <article className="latestGoalCard">
        <SavingsForm onSubmitSuccess={handleGoalSubmission} />
        {isLoading && <Spinner />}
        {latestGoal && <GoalCardContent latestGoal={latestGoal} />}
        {!latestGoal && <div>No goals added yet</div>}
      </article>
    </>
  );
};

export default LatestGoalCard;
