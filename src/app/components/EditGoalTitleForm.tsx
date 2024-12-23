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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { error: validationError } = goalTitle.validate({ title: newTitle });
    if (validationError) {
      setError(validationError.details[0].message);
      return;
    }

    if (!newTitle.trim()) {
      setError("Title cannot be empty!");
      return;
    }

    setError(null);
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
            onChange={(e) => {
              setNewTitle(e.target.value);
              setError(null);
            }}
            autoFocus
          ></input>
          {error && <p className="errorMessage">{error}</p>}
        </form>
      )}
    </>
  );
};

export default EditGoalTitleForm;
