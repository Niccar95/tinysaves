"use client";

import { Goals } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import ProgressBar from "./ProgressBar";
import ToolBar from "./ToolBar";
import { processDueDate } from "@/utils/dateUtils";

interface GoalProps {
  goal: Goals;
  deleteGoal: (goalId: string) => void;
}

const GoalCard = ({ goal, deleteGoal }: GoalProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [openToolBar, setOpenToolBar] = useState<boolean>(false);

  const [progress, setProgress] = useState<string>("");
  const [displayProgress, setDisplayProgress] = useState<number>(goal.progress);
  const [isComplete, setIsComplete] = useState<boolean>(goal.isComplete);

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const { formattedDate, daysRemaining } = processDueDate(goal.dueDate);

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

    const numericTargetAmount = parseFloat(progress);

    try {
      const response = await fetch(`${baseUrl}/api/goals/progress`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goalId: goal.goalId,
          progress: numericTargetAmount,
          targetAmount: goal.targetAmount,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setDisplayProgress(data.goal.progress);
        setIsComplete(data.goal.isComplete);

        setProgress("");
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

        <ProgressBar
          progress={displayProgress}
          isComplete={isComplete}
          targetAmount={goal.targetAmount}
        ></ProgressBar>

        <section className="actionSection">
          {(daysRemaining === null || daysRemaining > 0) &&
            displayProgress < goal.targetAmount && (
              <button className="addButton" onClick={handleOpenForm}>
                <i className="bi bi-coin"></i>
                Update progress
              </button>
            )}

          {(daysRemaining === null || daysRemaining > 0) &&
            displayProgress < goal.targetAmount && (
              <button className="toolsButton" onClick={handleOpenToolBar}>
                <i className="bi bi-three-dots"></i>
              </button>
            )}
        </section>

        {daysRemaining !== null && daysRemaining <= 0 && (
          <p>Due date reached!</p>
        )}

        {openToolBar && <ToolBar goal={goal} deleteGoal={deleteGoal} />}

        {isEditing && (
          <section className="progressFormSection">
            <form onSubmit={handleUpdateProgress}>
              <label htmlFor="progress">Update your savings progress: </label>
              <input
                id="progress"
                type="text"
                min="0"
                value={progress ?? ""}
                onChange={(e) => setProgress(e.target.value)}
              ></input>
              <button className="updateButton">Update</button>
            </form>
          </section>
        )}

        {goal.dueDate !== null &&
          daysRemaining !== null &&
          daysRemaining >= 0 && (
            <section className="progressInfoSection">
              <p>
                <i className="bi bi-calendar-date"></i>
                Final date: {formattedDate}
              </p>
              <p>
                <i className="bi bi-clock"></i>
                {daysRemaining} days remaining
              </p>
            </section>
          )}

        {goal.dueDate == null && <p>No due date</p>}
      </article>
    </>
  );
};

export default GoalCard;
