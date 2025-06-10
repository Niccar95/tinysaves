"use client";

import { Goals } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import ProgressBar from "./ProgressBar";
import { processCreatedAtDate, processDueDate } from "@/utils/dateUtils";
import ActionMenu from "./ActionMenu";
import { useSession } from "next-auth/react";
import { goalProgress } from "@/utils/validationSchemas";
import ProgressForm from "./ProgressForm";
import { updateGoalProgress } from "@/services/goalService";
import { useClickOutside } from "../hooks/useClickOutside";
import { motion } from "motion/react";

interface GoalProps {
  goal: Goals;
  handleDeleteGoal: (goalId: string) => void;
  handleEditGoalTitle: (goalId: string, newTitle: string) => void;
  onMilestoneReached: () => void;
}

const GoalCard = ({
  goal,
  handleDeleteGoal,
  handleEditGoalTitle,
  onMilestoneReached,
}: GoalProps) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [openActionsMenu, setOpenActionsMenu] = useState<boolean>(false);

  const [progress, setProgress] = useState<string>("");
  const [displayProgress, setDisplayProgress] = useState<number>(goal.progress);
  const [isComplete, setIsComplete] = useState<boolean>(goal.isComplete);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { formattedDate, daysRemaining, hoursRemaining } = processDueDate(
    goal.dueDate
  );

  const { formattedCreatedAtDate } = processCreatedAtDate(goal.createdAt);

  const actionsMenuRef = useClickOutside<HTMLDivElement>({
    onClickOutside: () => setOpenActionsMenu(false),
  });

  const progressFormRef = useClickOutside<HTMLDivElement>({
    onClickOutside: () => setIsEditing(false),
  });

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
      const data = await updateGoalProgress(
        goal.goalId,
        numericTargetAmount,
        goal.targetAmount,
        userId
      );

      if (data.goal.progress !== displayProgress) {
        onMilestoneReached();
      }

      setDisplayProgress(data.goal.progress);
      setIsComplete(data.goal.isComplete);
      setProgress("");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="goalCard"
      >
        <div className="titleWrapper">
          <h2 className="goalTitle">{goal.title}</h2>
          <p className="createdAtTag">Added on {formattedCreatedAtDate}</p>

          <div ref={actionsMenuRef} onClick={(e) => e.stopPropagation()}>
            {openActionsMenu && (
              <ActionMenu
                goal={goal}
                deleteGoal={handleDeleteGoal}
                handleEditGoalTitle={handleEditGoalTitle}
              />
            )}

            <button
              className="actionsMenuButton"
              onClick={() => {
                setOpenActionsMenu(!openActionsMenu);
              }}
            >
              <i className="bi bi-three-dots"></i>
            </button>
          </div>
        </div>

        <ProgressBar
          progress={displayProgress}
          isComplete={isComplete}
          targetAmount={goal.targetAmount}
          currency={goal.currency}
        ></ProgressBar>

        {daysRemaining !== null &&
          daysRemaining <= 0 &&
          hoursRemaining <= 0 && <p className="boldLabel">Due date reached!</p>}

        <div
          className="progressFormWrapper"
          ref={progressFormRef}
          onClick={(e) => e.stopPropagation()}
        >
          {isEditing && (
            <ProgressForm
              progress={progress}
              setProgress={setProgress}
              errors={errors}
              setErrors={setErrors}
              handleUpdateProgress={handleUpdateProgress}
            />
          )}

          {(daysRemaining === null ||
            daysRemaining > 0 ||
            hoursRemaining > 0) &&
            displayProgress < goal.targetAmount && (
              <button
                className="openProgressFormButton"
                onClick={() => {
                  if (!isEditing) {
                    setProgress("");
                    setErrors({});
                  }
                  setIsEditing(!isEditing);
                }}
              >
                <i className="bi bi-coin"></i>
                Update progress
              </button>
            )}
        </div>

        {goal.dueDate !== null &&
          daysRemaining !== null &&
          daysRemaining >= 0 &&
          !goal.isComplete && (
            <section className="dueDateInfoSection">
              <p className="dueDateTag">
                <i className="bi bi-calendar-date"></i>
                Final date: {formattedDate}
              </p>

              {daysRemaining === 0 && hoursRemaining > 0 && (
                <p className="dueDateTag">
                  <i className="bi bi-clock"></i>
                  {hoursRemaining} hour{hoursRemaining !== 1 ? "s" : ""}{" "}
                  remaining
                </p>
              )}

              {daysRemaining > 0 && (
                <p className="dueDateTag">
                  <i className="bi bi-clock"></i>
                  {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} remaining
                </p>
              )}
            </section>
          )}
        {goal.dueDate == null && goal.isComplete === false && (
          <p className="noDateTag">
            <i className="bi bi-calendar-date"></i>
            No due date
          </p>
        )}
      </motion.article>
    </>
  );
};

export default GoalCard;
