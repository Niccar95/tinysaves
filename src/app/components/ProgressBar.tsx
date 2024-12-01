"use client";

import React from "react";

interface ProgressDataProps {
  progress: number;
  isComplete: boolean;
  targetAmount: number;
}

const ProgressBar = ({
  progress,
  isComplete,
  targetAmount,
}: ProgressDataProps) => {
  return (
    <>
      {!isComplete && (
        <div className="progressBar">
          {progress} / {targetAmount}
        </div>
      )}

      {isComplete && (
        <div className="progressBar">
          <p>
            <b>Goal reached!</b>
          </p>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
