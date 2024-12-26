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
        <div>
          <h3>{milestone.name}</h3>
          <p>{milestone.criteria}</p>
        </div>
        <Image
          src={milestone.image}
          alt="milestone"
          width="100"
          height="100"
        ></Image>
      </article>
    </>
  );
};

export default MilestoneCard;
