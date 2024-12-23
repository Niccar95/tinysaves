"use client";

import { Milestones } from "@prisma/client";
import Image from "next/image";

interface ILatestMilestoneProps {
  latestMilestone: Milestones | null;
  onClose: () => void;
}

const MilestoneModal = ({
  latestMilestone,
  onClose,
}: ILatestMilestoneProps) => {
  if (!latestMilestone) {
    return null;
  }

  return (
    <>
      <div className="modalBackdrop">
        <div className="modalContent">
          <article className="earnedBadgeCard">
            <section className="badgeSection">
              <div>
                <h2>{latestMilestone.name}</h2>
                <p>{latestMilestone.criteria}</p>
              </div>
              <Image
                src={latestMilestone.image}
                alt="milestone"
                width="100"
                height="100"
              ></Image>
            </section>
            <button className="closeModalButton" onClick={onClose}>
              Close
            </button>
          </article>
        </div>
      </div>
    </>
  );
};
export default MilestoneModal;
