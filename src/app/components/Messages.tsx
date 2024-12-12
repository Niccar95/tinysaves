"use client";

import React, { useEffect, useState } from "react";

const Messages = () => {
  const tips = [
    "New to saving? Get started by adding a short term goal.",
    "Check out your stats page to see a summary of your progress so far.",
    "You can earn badges by completing goals or reaching certain milestones.",
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [fade, setFade] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const storedVisibility = localStorage.getItem("messagesVisible");

    setIsVisible(storedVisibility !== "false");
  }, []);

  useEffect(() => {
    if (isVisible) {
      let index = 0;
      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          index = (index + 1) % tips.length;
          setCurrentIndex(index);
          setFade(true);
        }, 500);
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [isVisible, tips.length]);

  const handleRemove = () => {
    setIsVisible(false);
    localStorage.setItem("messagesVisible", "false");
  };

  return (
    <>
      {isVisible && (
        <div className={`tipsBox ${fade && "fadeIn"} ${!fade && "fadeOut"}`}>
          <p>{tips[currentIndex]}</p>

          <button className="removeTipsButton" onClick={handleRemove}>
            <i className="bi bi-x"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default Messages;
