"use client";

import Joi from "joi";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";

const schema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.min":
      "Your savings goal name should have a minimum length of 3 characters",
    "string.empty": "This is a required field",
  }),
  targetAmount: Joi.number().greater(0).required().messages({
    "number.base": "Target amount must be a valid number and cannot be empty",
    "number.greater": "Target amount should be greater than 0",
  }),
  dueDate: Joi.string().allow("").optional(),
});

const SavingsForm = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [title, setTitle] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCreateGoal = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = schema.validate({ title, targetAmount, dueDate });

    if (error) {
      const newErrors = Object.fromEntries(
        error.details.map(({ path, message }) => [path[0], message])
      );
      setErrors(newErrors);
      return;
    }

    const numericTargetAmount = parseFloat(targetAmount);

    try {
      const response = await fetch(`/api/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          targetAmount: numericTargetAmount,
          dueDate: dueDate || null,
          userId,
        }),
      });

      if (response.ok) {
        console.log("Savings goal created successfully!");
      } else {
        console.log("Failed to create goal!");
      }
    } catch (error) {
      console.error("Failed to create goal", error);
    }
  };

  return (
    <>
      <section className="savingsForm">
        <h2>Add your savings goal</h2>
        <form onSubmit={handleCreateGoal}>
          <label htmlFor="title">
            What savings goal would you like to set?
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}

          <label htmlFor="targetAmount">How much would you like to save?</label>
          <input
            id="targetAmount"
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            min="0"
            inputMode="decimal"
          ></input>
          {errors.targetAmount && (
            <div style={{ color: "red" }}>{errors.targetAmount}</div>
          )}
          <label htmlFor="dueDate">When is the due date? (optional)</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          ></input>
          <button type="submit">Add goal</button>
        </form>
      </section>
    </>
  );
};

export default SavingsForm;
