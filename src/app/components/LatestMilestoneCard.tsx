"use client";

import { fetchLatestMilestone } from "@/services/milestoneService";
import { Milestones } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface LatestMilestoneProps {
  userId: string;
}

const LatestMilestoneCard = ({ userId }: LatestMilestoneProps) => {
  const [latestMilestone, setLatestMilestone] = useState<Milestones | null>(
    null
  );

  useEffect(() => {
    if (!userId) return;

    const getLatestMilestone = async () => {
      const milestone = await fetchLatestMilestone();

      if (milestone?.milestoneId !== latestMilestone?.milestoneId) {
        setLatestMilestone(milestone);
      }
    };

    getLatestMilestone();
  }, [latestMilestone?.milestoneId, userId]);

  return (
    <>
      <motion.article
        initial={{ x: 300, scale: 0 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
        className="latestCard"
      >
        {latestMilestone && latestMilestone && (
          <>
            <div>
              <h2 className="latestGoalHeading">
                Recently reached milestone:{" "}
              </h2>
              <h3>{latestMilestone.name}</h3>
            </div>
            <Image
              src={latestMilestone.image}
              alt="milestone"
              width="100"
              height="100"
            ></Image>
          </>
        )}

        {!latestMilestone && <p>No milestones reached yet</p>}
      </motion.article>
    </>
  );
};

export default LatestMilestoneCard;
