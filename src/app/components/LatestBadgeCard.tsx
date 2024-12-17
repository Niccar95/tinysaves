"use client";

import { Badges, UserBadges } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface LatestBadgeProps {
  userId: string;
}

const LatestBadgeCard = ({ userId }: LatestBadgeProps) => {
  const [latestBadge, setLatestBadge] = useState<
    (UserBadges & { badge: Badges }) | null
  >(null);

  useEffect(() => {
    if (!userId) return;
    const getLatestBadge = async () => {
      try {
        const response = await fetch("/api/badges");

        if (!response.ok) {
          throw new Error("Failed to fetch the badge");
        }

        const { latestBadge } = await response.json();
        setLatestBadge(latestBadge);
      } catch (error) {
        console.log("Unable to fetch latest badge", error);
      }
    };
    getLatestBadge();
  }, [userId]);

  console.log(latestBadge);

  return (
    <>
      {latestBadge && latestBadge.badge && (
        <article className="latestCard">
          <h2 className="latestGoalHeading">Recently added goal: </h2>
          <h3>{latestBadge.badge.name}</h3>
        </article>
      )}
    </>
  );
};

export default LatestBadgeCard;
