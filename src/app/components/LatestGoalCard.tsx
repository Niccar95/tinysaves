"use client";

import { Goals } from "@prisma/client";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface LatestGoalProps {
  latestGoal: Goals;
}

const LatestGoalCard = ({ latestGoal }: LatestGoalProps) => {
  const percentage = (latestGoal.progress / latestGoal.targetAmount) * 100;

  const roundedPercentage = Math.round(percentage);

  return (
    <>
      <article className="latestGoalCard">
        <div>
          <h2 className="latestGoalHeading">Latest Goal: </h2>
          <h3>{latestGoal.title}</h3>
        </div>

        <div style={{ width: 100, height: 100 }}>
          <CircularProgressbar
            value={roundedPercentage}
            text={`${roundedPercentage}%`}
          />
        </div>
      </article>
    </>
  );
};

export default LatestGoalCard;
