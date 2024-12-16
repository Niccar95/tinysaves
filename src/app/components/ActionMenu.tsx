import { Goals } from "@prisma/client";
import React from "react";

interface GoalProps {
  goal: Goals;
  deleteGoal: (goalId: string) => void;
}

const ActionMenu = ({ goal, deleteGoal }: GoalProps) => {
  const handleDeleteGoal = async () => {
    deleteGoal(goal.goalId);
  };

  return (
    <>
      <section className="actionMenu">
        <button className="actionButton customise">
          <i className="bi bi-palette"></i>
          Customise
        </button>
        <button onClick={handleDeleteGoal} className="actionButton delete">
          <i className="bi bi-trash3"></i>
          Delete goal
        </button>
      </section>
    </>
  );
};

export default ActionMenu;
