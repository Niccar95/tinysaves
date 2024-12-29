"use client";

import { fetchLatestMilestone } from "@/services/milestoneService";
import { Milestones } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
      <article className="latestCard">
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
      </article>
    </>
  );
};

export default LatestMilestoneCard;
