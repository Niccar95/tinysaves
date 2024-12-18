import { Badges } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface IBadgeProps {
  badge: Badges;
}

const Badgecard = ({ badge }: IBadgeProps) => {
  return (
    <>
      <article className="badgeCard">
        <div>
          <h3>{badge.name}</h3>
          <p>{badge.criteria}</p>
        </div>
        <Image src={badge.image} alt="badge" width="100" height="100"></Image>
      </article>
    </>
  );
};

export default Badgecard;
