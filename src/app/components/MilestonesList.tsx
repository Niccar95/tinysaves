"use client";

import { Milestones, UserMilestones } from "@prisma/client";
import MilestoneCard from "./MilestoneCard";

interface IMilestonesProps {
  milestones: (UserMilestones & { milestone: Milestones })[];
}

const MilestonesList = ({ milestones }: IMilestonesProps) => {
  return (
    <>
      <div className="milestonesListWrapper">
        {milestones.length > 0 ? (
          milestones.map((milestone) => (
            <MilestoneCard key={milestone.id} milestone={milestone.milestone} />
          ))
        ) : (
          <p>No milestones reached yet!</p>
        )}
      </div>
    </>
  );
};

export default MilestonesList;
