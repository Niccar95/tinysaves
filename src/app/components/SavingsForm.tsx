"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import money from "/public/moneyIcon.svg";

import { goalForm } from "@/utils/validationSchemas";

const SavingsForm = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [title, setTitle] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isFormHidden, setIsFormHidden] = useState<boolean>(true);

  const baseUrl =
    process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000";

  const handleCreateGoal = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = goalForm.validate(
      { title, targetAmount, dueDate },
      { abortEarly: false }
    );

    if (error) {
      const newErrors = Object.fromEntries(
        error.details.map(({ path, message }) => [path[0], message])
      );
      setErrors(newErrors);
      return;
    }

    const numericTargetAmount = parseFloat(targetAmount);

    try {
      const response = await fetch(`${baseUrl}/api/goals`, {
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
        setSuccessMessage("Savings goal created successfully!");
        setTitle("");
        setTargetAmount("");
        setDueDate("");
        setErrors({});
      } else {
        setSuccessMessage("");
        console.log("Failed to create goal!");
      }
    } catch (error) {
      setSuccessMessage("");
      console.error("Failed to create goal", error);
    }
  };

  const addNewGoal = () => {
    if (isFormHidden) {
      setIsFormHidden(false);
    } else {
      setIsFormHidden(true);
    }
  };

  return (
    <>
      <button className="addGoalButton" onClick={addNewGoal}>
        <i className="bi bi-plus-circle"></i>
        Add new goal
      </button>

      {!isFormHidden && (
        <form className="addGoalForm" onSubmit={handleCreateGoal}>
          <section className="topSection">
            <h2>Time to Save!</h2>
            <Image className="moneyIcon" src={money} alt="icon"></Image>
          </section>
          <label htmlFor="title">
            What savings goal would you like to set?
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors({ ...errors, title: "" });
            }}
          ></input>
          {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}

          <label htmlFor="targetAmount">How much would you like to save?</label>
          <input
            id="targetAmount"
            type="text"
            value={targetAmount}
            onChange={(e) => {
              setTargetAmount(e.target.value);
              setErrors({ ...errors, targetAmount: "" });
            }}
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
            onChange={(e) => {
              setDueDate(e.target.value);
              setErrors({ ...errors, dueDate: "" });
            }}
          ></input>
          {errors.dueDate && (
            <div style={{ color: "red" }}>{errors.dueDate}</div>
          )}

          {successMessage && (
            <div style={{ color: "green", marginBottom: "1rem" }}>
              {successMessage}
            </div>
          )}
          <button type="submit" className="submitButton">
            Add goal
          </button>
        </form>
      )}
    </>
  );
};

export default SavingsForm;
