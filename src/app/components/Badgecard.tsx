import { Badges } from "@prisma/client";
import React from "react";

interface IBadgeProps {
  badge: Badges;
}

const Badgecard = ({ badge }: IBadgeProps) => {
  return (
    <>
      <article className="badgeCard">
        <h3>{badge.name}</h3>
        <p>{badge.criteria}</p>
      </article>
    </>
  );
};

export default Badgecard;
