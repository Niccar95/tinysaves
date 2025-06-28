"use client";

import { Goals } from "@prisma/client";
import React, { useState } from "react";
import EditGoalTitleForm from "./EditGoalTitleForm";
import { useTranslations } from "next-intl";

interface GoalProps {
  goal: Goals;
  deleteGoal: (goalId: string) => void;
  handleEditGoalTitle: (goalId: string, newTitle: string) => void;
}

const ActionsMenu = ({ goal, deleteGoal, handleEditGoalTitle }: GoalProps) => {
  const t = useTranslations("goalCard.actionsMenu");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleDeleteGoal = async () => {
    deleteGoal(goal.goalId);
  };

  return (
    <>
      {!isEditing && (
        <section className="actionsMenu">
          <button
            className="actionButton customise"
            onClick={() => setIsEditing(!isEditing)}
          >
            <i className="bi bi-pencil"></i>
            {t("editTitle")}
          </button>
          <button className="actionButton delete" onClick={handleDeleteGoal}>
            <i className="bi bi-trash3 delete"></i>
            {t("deleteGoal")}
          </button>
        </section>
      )}
      {isEditing && (
        <EditGoalTitleForm
          currentTitle={goal.title}
          goalId={goal.goalId}
          handleEditGoalTitle={handleEditGoalTitle}
        />
      )}
    </>
  );
};

export default ActionsMenu;
