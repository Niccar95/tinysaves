import { Goals } from "@prisma/client";
import React from "react";

interface GoalProps {
  goal: Goals;
  deleteGoal: (goalId: string) => void;
}

const ToolBar = ({ goal, deleteGoal }: GoalProps) => {
  const handleDeleteGoal = async () => {
    deleteGoal(goal.goalId);
  };

  return (
    <>
      <section className="toolBar">
        <button className="actionButton">
          <i className="bi bi-palette"></i>
          Customise
        </button>
        <button onClick={handleDeleteGoal} className="actionButton">
          <i className="bi bi-trash3"></i>
          Delete goal
        </button>
      </section>
    </>
  );
};

export default ToolBar;
