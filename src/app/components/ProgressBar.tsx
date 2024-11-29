"use client";

import React, { useState } from "react";

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
  const [progressData, setProgressData] = useState<number>(progress);
  const [fullAmount, setFullAmount] = useState<number>(targetAmount);
  const [completed, setCompleted] = useState<boolean>(isComplete);

  return (
    <>
      <div className="progressBar">
        {progressData} / {fullAmount}
      </div>
    </>
  );
};

export default ProgressBar;
