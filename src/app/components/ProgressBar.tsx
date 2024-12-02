"use client";

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
  const percentage = (progress / targetAmount) * 100;

  const dynamicProgress = `${percentage}%`;

  console.log(percentage);

  return (
    <>
      {!isComplete && (
        <div className="progressBar">
          <div
            className="progress"
            style={{
              width: `${dynamicProgress}`,
            }}
          ></div>
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
