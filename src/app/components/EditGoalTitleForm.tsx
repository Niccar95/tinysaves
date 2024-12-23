"use client";
import { goalTitle } from "@/utils/validationSchemas";
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
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { error } = goalTitle.validate({ newTitle });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      console.error("Title cannot be empty!");
      return;
    }
    handleEditGoalTitle(goalId, newTitle);
    setIsSubmitted(true);
  };
  return (
    <>
      {!isSubmitted && (
        <form onSubmit={handleSubmit} className="editGoalTitleForm">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          ></input>
        </form>
      )}
    </>
  );
};

export default EditGoalTitleForm;
