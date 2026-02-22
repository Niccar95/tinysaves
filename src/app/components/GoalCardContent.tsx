"use client";

import React from "react";
import { Goals } from "@prisma/client";
import { useTranslations } from "next-intl";
import ProgressBar from "./ProgressBar";

interface GoalProps {
  latestGoal: Goals;
}

const GoalCardContent = ({ latestGoal }: GoalProps) => {
  const t = useTranslations("latestGoal");

  return (
    <>
      <span className="goalCardLabel">{t("recent")}</span>
      <div className="cardMainContent">
        <h3>{latestGoal.title}</h3>
        <ProgressBar
          progress={latestGoal.progress}
          isComplete={latestGoal.isComplete}
          targetAmount={latestGoal.targetAmount}
          currency={latestGoal.currency}
        />
      </div>
    </>
  );
};

export default GoalCardContent;
