"use client";

import { Goals } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import ProgressBar from "./ProgressBar";

interface GoalProps {
  goal: Goals;
}

const GoalCard = ({ goal }: GoalProps) => {
  const [isEditing, setisEditing] = useState<boolean>(false);

  const [progress, setProgress] = useState<number>(goal.progress);

  const handleOpenForm = () => {
    if (!isEditing) {
      setisEditing(true);
    } else {
      setisEditing(false);
    }
  };

  const handleUpdateProgress = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/goals/progress", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goalId: goal.goalId,
          progress: progress,
          targetAmount: goal.targetAmount,
        }),
      });

      if (response.ok) {
        setisEditing(false);
        setProgress(0);
      }
    } catch (error) {
      console.error("Failed to create goal", error);
    }
  };

  return (
    <>
      <article className="goalCard">
        <h2>{goal.title}</h2>

        <section className="progressSection">
          <ProgressBar
            progress={goal.progress}
            isComplete={goal.isComplete}
            targetAmount={goal.targetAmount}
          ></ProgressBar>
          <button className="addButton" onClick={handleOpenForm}>
            Update progress
          </button>
        </section>

        {isEditing && (
          <section className="progressFormSection">
            <form onSubmit={handleUpdateProgress}>
              <label htmlFor="progress">Update your savings progress: </label>
              <input
                id="progress"
                type="number"
                min="0"
                value={progress}
                onChange={(e) => setProgress(+e.target.value)}
              ></input>
              <button>Update</button>
            </form>
          </section>
        )}
      </article>
    </>
  );
};

export default GoalCard;
