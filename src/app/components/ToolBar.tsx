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
        <button className="actionButton">Customise</button>
        <button onClick={handleDeleteGoal} className="actionButton">
          Delete goal
        </button>
      </section>
    </>
  );
};

export default ToolBar;
