"use client";

import { Badges } from "@prisma/client";

interface ILatestBadgeProps {
  latestBadge: Badges;
  onClose: () => void;
}

const EarnedBadgeModal = ({ latestBadge, onClose }: ILatestBadgeProps) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Congratulations!</h2>
        <p>You earned a new badge: {latestBadge.name}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EarnedBadgeModal;
