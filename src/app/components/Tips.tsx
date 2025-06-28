"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";

const Tips = () => {
  const t = useTranslations("messages");

  const tips: string[] = t.raw("tips");

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
