"use client";
import React, { FormEvent, useState } from "react";

interface IEditTitleProps {
  goalId: string;
  currentTitle: string;
  handleEditGoalTitle: (goalId: string, newTitle: string) => void;
}

const EditGoalTitleForm = ({
  goalId,
  currentTitle,
  handleEditGoalTitle,
}: IEditTitleProps) => {
  const [newTitle, setNewTitle] = useState<string>(currentTitle);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      console.error("Title cannot be empty!");
      return;
    }
    handleEditGoalTitle(goalId, newTitle);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        ></input>
        <button>Save changes</button>
      </form>
    </>
  );
};

export default EditGoalTitleForm;
