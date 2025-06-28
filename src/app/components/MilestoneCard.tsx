import { Milestones } from "@prisma/client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface IMilestoneProps {
  milestone: Milestones;
  index: number;
}

const MilestoneCard = ({ milestone }: IMilestoneProps) => {
  const t = useTranslations("milestoneList");

  return (
    <>
      <article className="milestoneCard">
        <div className="descriptionWrapper">
          <h3>{t(`${milestone.name}.title`)}</h3>

          <p className="milestoneCriteria">
            {t(`${milestone.name}.description`)}
          </p>
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
