"use client";

import { Badges } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ILatestBadgeProps {
  latestBadge: Badges | null;
}

const EarnedBadgeModal = ({ latestBadge }: ILatestBadgeProps) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (latestBadge) {
      setShowModal(true);
    }
  }, [latestBadge]);

  const closeModal = () => {
    setShowModal(false);
  };

  if (!latestBadge) {
    return null;
  }

  return (
    <>
      {showModal && (
        <div className="modalBackdrop">
          <div className="modalContent">
            <article className="earnedBadgeCard">
              <section className="badgeSection">
                <div>
                  <h2>Congratulations!</h2>
                  <p>You earned a new badge: {latestBadge.name}</p>
                </div>
                <Image
                  src={latestBadge.image}
                  alt="New badge"
                  width="100"
                  height="100"
                ></Image>
              </section>
              <button className="closeModalButton" onClick={closeModal}>
                Close
              </button>
            </article>
          </div>
        </div>
      )}
    </>
  );
};
export default EarnedBadgeModal;
