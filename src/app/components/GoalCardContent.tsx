"use client";
import { CircularProgressbar } from "react-circular-progressbar";

import React from "react";
import { Goals } from "@prisma/client";
import { useTranslations } from "next-intl";

interface GoalProps {
  latestGoal: Goals;
}

const GoalCardContent = ({ latestGoal }: GoalProps) => {
  const t = useTranslations("latestGoal");
  const percentage = (latestGoal.progress / latestGoal.targetAmount) * 100;

  const roundedPercentage = Math.round(percentage);

  return (
    <>
      <div>
        <h2 className="latestGoalHeading">{t("recent")}</h2>
        <h3>{latestGoal?.title}</h3>
      </div>

      <div className="circularProgressBarContainer">
        <CircularProgressbar
          value={roundedPercentage}
          text={`${roundedPercentage}%`}
        />
      </div>
    </>
  );
};

export default GoalCardContent;
