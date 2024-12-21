"use client";

import { Milestones, UserMilestones } from "@prisma/client";
import Badgecard from "./MilestoneCard";

interface IMilestonesProps {
  milestones: (UserMilestones & { milestone: Milestones })[];
}

const MilestonesList = ({ milestones }: IMilestonesProps) => {
  return (
    <>
      <div className="badgesListWrapper">
        {milestones.length > 0 ? (
          milestones.map((milestone) => (
            <Badgecard key={milestone.id} milestone={milestone.milestone} />
          ))
        ) : (
          <p>No milestones reached yet!</p>
        )}
      </div>
    </>
  );
};

export default MilestonesList;
