"use client";

import { Badges, UserBadges } from "@prisma/client";
import Image from "next/image";
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

  return (
    <>
      <article className="latestCard">
        {latestBadge && latestBadge.badge && (
          <>
            <div>
              <h2 className="latestGoalHeading">Recently earned badge: </h2>
              <h3>{latestBadge.badge.name}</h3>
            </div>
            <Image
              src={latestBadge.badge.image}
              alt="badge"
              width="100"
              height="100"
            ></Image>
          </>
        )}

        {!latestBadge && <p>No badges earned yet</p>}
      </article>
    </>
  );
};

export default LatestBadgeCard;
