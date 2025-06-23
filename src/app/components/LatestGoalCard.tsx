"use client";

import { Goals } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import SavingsForm from "./SavingsForm";
import Spinner from "./Spinner";
import GoalCardContent from "./GoalCardContent";
import { getLatestGoal } from "@/services/goalService";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
interface LatestGoalProps {
  userId: string;
}

const LatestGoalCard = ({ userId }: LatestGoalProps) => {
  const [latestGoal, setLatestGoal] = useState<Goals | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasGoals, setHasGoals] = useState<boolean>(true);

  const t = useTranslations("latestGoal");

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
      <motion.article
        initial={{ x: 300, scale: 0 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="latestCard"
      >
        <SavingsForm onSubmitSuccess={handleGoalSubmission} />
        {isLoading && <Spinner />}
        {latestGoal && <GoalCardContent latestGoal={latestGoal} />}
        {!latestGoal && <p className="noGoalsLabel">{t("noGoals")}</p>}
      </motion.article>
    </>
  );
};

export default LatestGoalCard;
