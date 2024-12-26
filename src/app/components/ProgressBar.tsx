"use client";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ProgressDataProps {
  progress: number;
  isComplete: boolean;
  targetAmount: number;
  currency: string;
}

const ProgressBar = ({
  progress,
  isComplete,
  targetAmount,
  currency,
}: ProgressDataProps) => {
  const percentage = (progress / targetAmount) * 100;

  const dynamicProgress = `${percentage}%`;

  const roundedPercentage = Math.round(percentage);

  return (
    <>
      <section className="progressSection">
        {!isComplete && (
          <div className="progressBar">
            <div
              className="progress"
              style={{
                width: `${dynamicProgress}`,
              }}
            ></div>
            <p className="progressInfo">
              {progress} / {targetAmount} {currency}
            </p>
          </div>
        )}

        {isComplete && (
          <div className="progressBar">
            <p className="progressInfo">Goal reached!</p>
          </div>
        )}

        <div style={{ width: 100, height: 100 }}>
          <CircularProgressbar
            value={roundedPercentage}
            text={`${roundedPercentage}%`}
          />
        </div>
      </section>
    </>
  );
};

export default ProgressBar;
