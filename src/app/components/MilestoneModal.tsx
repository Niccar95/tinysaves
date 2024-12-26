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
          <article className="newMilestoneCard">
            <h1>Congratulations!</h1>
            <h2 className="congratulationsHeading">
              You have reached a new milestone:{" "}
            </h2>

            <section className="milestoneSection">
              <Image
                src={latestMilestone.image}
                alt="milestone"
                width="150"
                height="150"
              ></Image>
              <div className="descriptionWrapper">
                <h2 className="milestoneName">{latestMilestone.name}</h2>
                <h3>{latestMilestone.criteria}</h3>
              </div>
            </section>

            <button className="closeButton" onClick={onClose}>
              Close
            </button>
          </article>
        </div>
      </div>
    </>
  );
};
export default MilestoneModal;
