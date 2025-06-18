"use client";

import { Milestones, UserMilestones } from "@prisma/client";
import MilestoneCard from "./MilestoneCard";
import LockedMilestoneCard from "./LockedMilestoneCard";

interface IMilestonesProps {
  milestones: (UserMilestones & { milestone: Milestones })[];
  remainingMilestoneCount: number;
}

const MilestonesList = ({
  milestones,
  remainingMilestoneCount,
}: IMilestonesProps) => {
  const renderRemainingCards = () => {
    const numbers = Array.from(
      { length: remainingMilestoneCount },
      (_, i) => i + 1
    );
    return numbers.map((i) => <LockedMilestoneCard key={i} />);
  };

  return (
    <>
      <div className="milestonesListWrapper">
        {milestones.length > 0 ? (
          <>
            {milestones.map((milestone) => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone.milestone}
              />
            ))}
            {renderRemainingCards()}
          </>
        ) : (
          <>{renderRemainingCards()}</>
        )}
      </div>
    </>
  );
};

export default MilestonesList;
