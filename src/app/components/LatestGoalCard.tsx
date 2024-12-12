"use client";

import React from "react";
import { Goals } from "@prisma/client";

interface LatestGoalProps {
  goal: Goals | null;
}

const LatestGoalCard = ({ goal }: LatestGoalProps) => {
  return (
    <>
      <article className="goalCard">
        <h2>latest goal</h2>
        <h3>{goal?.title}</h3>

        <p>{goal?.progress}</p>
      </article>
    </>
  );
};

export default LatestGoalCard;
