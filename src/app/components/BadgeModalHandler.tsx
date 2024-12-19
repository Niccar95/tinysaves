"use client";
import React, { useState, useEffect } from "react";
import EarnedBadgeModal from "./EarnedBadgeModal";
import { Badges } from "@prisma/client";

interface ILatestBadgeProps {
  latestBadge: Badges;
}

const BadgeModalHandler = ({ latestBadge }: ILatestBadgeProps) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (latestBadge) {
      setShowModal(true);
    }
  }, [latestBadge]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && latestBadge && (
        <EarnedBadgeModal latestBadge={latestBadge} onClose={closeModal} />
      )}
    </>
  );
};

export default BadgeModalHandler;
