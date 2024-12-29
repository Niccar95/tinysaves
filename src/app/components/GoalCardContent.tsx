"use client";
import { CircularProgressbar } from "react-circular-progressbar";

import React from "react";
import { Goals } from "@prisma/client";

interface GoalProps {
  latestGoal: Goals;
}

const GoalCardContent = ({ latestGoal }: GoalProps) => {
  const percentage = (latestGoal.progress / latestGoal.targetAmount) * 100;

  const roundedPercentage = Math.round(percentage);
  return (
    <>
      <div>
        <h2 className="latestGoalHeading">Recently added goal: </h2>
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
