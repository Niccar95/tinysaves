import { Goals } from "@prisma/client";
import React from "react";
import ProgressBar from "./ProgressBar";

interface GoalProps {
  goal: Goals;
}

const GoalCard = ({ goal }: GoalProps) => {
  return (
    <>
      <article className="goalCard">
        <h2>{goal.title}</h2>
        <ProgressBar
          progress={goal.progress}
          isComplete={goal.isComplete}
          targetAmount={goal.targetAmount}
        ></ProgressBar>
      </article>
    </>
  );
};

export default GoalCard;
