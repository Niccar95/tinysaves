"use client";

import { Goals } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import ProgressBar from "./ProgressBar";
import ToolBar from "./ToolBar";

interface GoalProps {
  goal: Goals;
  deleteGoal: (goalId: string) => void;
}

const GoalCard = ({ goal, deleteGoal }: GoalProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [openToolBar, setOpenToolBar] = useState<boolean>(false);

  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [displayProgress, setDisplayProgress] = useState<number>(goal.progress);
  const [isComplete, setIsComplete] = useState<boolean>(goal.isComplete);

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const handleOpenForm = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  };

  const handleOpenToolBar = () => {
    if (!openToolBar) {
      setOpenToolBar(true);
    } else {
      setOpenToolBar(false);
    }
  };

  const handleUpdateProgress = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/api/goals/progress`, {
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
        const data = await response.json();

        setDisplayProgress(data.goal.progress);
        setIsComplete(data.goal.isComplete);

        setProgress(undefined);
        setIsEditing(false);
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
            progress={displayProgress}
            isComplete={isComplete}
            targetAmount={goal.targetAmount}
          ></ProgressBar>

          <section className="actionSection">
            <button className="addButton" onClick={handleOpenForm}>
              Update progress
            </button>
            <button className="toolsButton" onClick={handleOpenToolBar}>
              <i className="bi bi-three-dots"></i>
            </button>
          </section>
        </section>

        {openToolBar && <ToolBar goal={goal} deleteGoal={deleteGoal} />}

        {isEditing && (
          <section className="progressFormSection">
            <form onSubmit={handleUpdateProgress}>
              <label htmlFor="progress">Update your savings progress: </label>
              <input
                id="progress"
                type="number"
                min="0"
                value={progress ?? ""}
                onChange={(e) =>
                  setProgress(
                    e.target.value === "" ? undefined : +e.target.value
                  )
                }
              ></input>
              <button className="updateButton">Update</button>
            </form>
          </section>
        )}
      </article>
    </>
  );
};

export default GoalCard;
