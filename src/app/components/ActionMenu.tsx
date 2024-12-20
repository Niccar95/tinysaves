"use client";

import { Goals } from "@prisma/client";
import React, { useState } from "react";
import { editGoalTitle } from "../services/goalService";
import EditGoalTitleForm from "./EditGoalTitleForm";

interface GoalProps {
  goal: Goals;
  deleteGoal: (goalId: string) => void;
}

const ActionMenu = ({ goal, deleteGoal }: GoalProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleDeleteGoal = async () => {
    deleteGoal(goal.goalId);
  };

  const handleEditGoalTitle = async () => {
    try {
      await editGoalTitle(goal.goalId, goal.title);
    } catch (error) {
      console.log("Failed to edit goal title", error);
    }
  };

  return (
    <>
      <section className="actionMenu">
        <button
          className="actionButton customise"
          onClick={() => setIsEditing(!isEditing)}
        >
          <i className="bi bi-pencil"></i>
          Edit goal name
        </button>
        <button className="actionButton delete" onClick={handleDeleteGoal}>
          <i className="bi bi-trash3 delete"></i>
          Delete goal
        </button>
      </section>
      {isEditing && <EditGoalTitleForm />}
    </>
  );
};

export default ActionMenu;
