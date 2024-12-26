import { Milestones } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface IMilestoneProps {
  milestone: Milestones;
}

const MilestoneCard = ({ milestone }: IMilestoneProps) => {
  return (
    <>
      <article className="milestoneCard">
        <div className="descriptionWrapper">
          <h3>{milestone.name}</h3>
          <p className="milestoneCriteria">{milestone.criteria}</p>
        </div>
        <Image
          className="milestoneIcon"
          src={milestone.image}
          alt="milestone"
          width="80"
          height="80"
        ></Image>
      </article>
    </>
  );
};

export default MilestoneCard;
