"use client";

import { Milestones, UserMilestones } from "@prisma/client";
import MilestoneCard from "./MilestoneCard";
import LockedMilestoneCard from "./LockedMilestoneCard";
import { motion } from "motion/react";

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
    return numbers.map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
          delay: milestones.length * 0.3 + i * 0.2,
        }}
      >
        <LockedMilestoneCard />
      </motion.div>
    ));
  };

  return (
    <>
      <div className="milestonesListWrapper">
        {milestones.length > 0 ? (
          <>
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: (i + 1) * 0.3,
                }}
              >
                <MilestoneCard milestone={milestone.milestone} />
              </motion.div>
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
