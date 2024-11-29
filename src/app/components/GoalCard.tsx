import { Goals } from "@prisma/client";
import React from "react";

interface GoalProps {
  goal: Goals;
}

const GoalCard = ({ goal }: GoalProps) => {
  return (
    <>
      <article>
        <h2>{goal.title}</h2>
      </article>
    </>
  );
};

export default GoalCard;
