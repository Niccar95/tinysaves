"use client";

import { fetchLatestBadge } from "@/services/badgeService";
import { Badges } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface LatestBadgeProps {
  userId: string;
}

const LatestBadgeCard = ({ userId }: LatestBadgeProps) => {
  const [latestBadge, setLatestBadge] = useState<Badges | null>(null);

  useEffect(() => {
    if (!userId) return;

    const getLatestBadge = async () => {
      const badge = await fetchLatestBadge();
      console.log("run");

      if (badge?.badgeId !== latestBadge?.badgeId) {
        setLatestBadge(badge);
      }
    };

    getLatestBadge();
  }, [latestBadge?.badgeId, userId]);

  return (
    <>
      <article className="latestCard">
        {latestBadge && latestBadge && (
          <>
            <div>
              <h2 className="latestGoalHeading">Recently earned badge: </h2>
              <h3>{latestBadge.name}</h3>
            </div>
            <Image
              src={latestBadge.image}
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
