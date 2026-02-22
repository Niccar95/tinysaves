"use client";

import { fetchLatestMilestone } from "@/services/milestoneService";
import { Milestones } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

interface LatestMilestoneProps {
  userId: string;
}

const LatestMilestoneCard = ({ userId }: LatestMilestoneProps) => {
  const [latestMilestone, setLatestMilestone] = useState<Milestones | null>(
    null
  );

  const t = useTranslations("latestMilestone");

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
        {latestMilestone && (
          <>
            <span className="goalCardLabel">{t("recent")}</span>
            <div className="cardMainContent">
              <h3>{latestMilestone.name}</h3>
              <p className="milestoneCriteriaLabel">{latestMilestone.criteria}</p>
              <div className="milestoneImageWrapper">
                <Image
                  src={latestMilestone.image}
                  alt="milestone"
                  width="100"
                  height="100"
                />
              </div>
            </div>
          </>
        )}

        {!latestMilestone && <p>{t("noMilestones")}</p>}
      </motion.article>
    </>
  );
};

export default LatestMilestoneCard;
