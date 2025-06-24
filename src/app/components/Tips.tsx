"use client";

import React, { useState } from "react";

const Tips = () => {
  const tips: string[] = [
    "New to saving? Get started by adding a short term goal.",
    "Check out your stats page to see a summary of your progress so far.",
    "You can earn badges by completing goals or reaching certain milestones.",
  ];

  const [currentTip, setCurrentTip] = useState<number>(0);

  const handleChangeTip = (i: number) => {
    setCurrentTip(i);
  };

  return (
    <>
      <aside className="tipsBox">
        <div className="tipContent">
          <i className="bi bi-info-circle"></i>
          <p>{tips[currentTip]}</p>
        </div>

        <div className="sliderButtonContainer">
          {tips.map((tip, i) => {
            return (
              <button
                className={`tipSliderButton ${
                  currentTip === i ? "highlight" : ""
                }`}
                key={tip}
                onClick={() => {
                  handleChangeTip(i);
                }}
              ></button>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Tips;
