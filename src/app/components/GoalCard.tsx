"use client";

import { Goals } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import ProgressBar from "./ProgressBar";
import ToolBar from "./ToolBar";
import { processCreatedAtDate, processDueDate } from "@/utils/dateUtils";
import { goalProgress } from "@/utils/validationSchemas";

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  //const [currency, setCurrency] = useState<string>(goal.currency); //FOR LATER

  const baseUrl =
    process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000";

  const { formattedDate, daysRemaining } = processDueDate(goal.dueDate);
  const { formattedCreatedAtDate } = processCreatedAtDate(goal.createdAt);

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

    const { error } = goalProgress.validate({ progress });

    if (error) {
      const newErrors = Object.fromEntries(
        error.details.map(({ path, message }) => [path[0], message])
      );
      setErrors(newErrors);
      return;
    }

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
        <div className="titleWrapper">
          <h2 className="goalTitle">{goal.title}</h2>
          <p className="createdAtTag">Added on {formattedCreatedAtDate}</p>
        </div>

        <ProgressBar
          progress={displayProgress}
          isComplete={isComplete}
          targetAmount={goal.targetAmount}
          currency={goal.currency}
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

              <div className="inputWrapper">
                <input
                  id="progress"
                  type="text"
                  min="0"
                  value={progress ?? ""}
                  onChange={(e) => {
                    setProgress(e.target.value);
                    setErrors({ ...errors, progress: "" });
                  }}
                ></input>
                {errors.progress && (
                  <div className="errorMessage">{errors.progress}</div>
                )}
              </div>
              <button type="submit" className="updateButton margin">
                Update
              </button>
            </form>
          </section>
        )}

        {goal.dueDate !== null &&
          daysRemaining !== null &&
          daysRemaining >= 0 &&
          !goal.isComplete && (
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
