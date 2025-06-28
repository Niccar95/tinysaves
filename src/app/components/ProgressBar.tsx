"use client";

import { useTranslations } from "next-intl";
import { CircularProgressbar } from "react-circular-progressbar";

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

  const t = useTranslations("goalCard");

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
            <p className="progressInfo">{t("goalReached")}</p>
          </div>
        )}

        <div className="circularProgressBarContainer">
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
